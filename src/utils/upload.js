import OSS from 'ali-oss';
import request from '@/utils/request';
import { getImageSize } from '@/utils/utils';

const getConfig = (params = {}, options = {}) => {
  return request('/auth/goods/product/getOssConfig', {
    method: 'POST',
    data: params,
    ...options
  });
}

let uploadDir = [];
let ossConfig = null

const upload = async (file, code) => {
  if (!uploadDir.length) {
    const res = await getConfig({ code });
    console.log('res.data.uploadDir',res)
    ossConfig = res.data.ossConfig
    uploadDir = res.data.uploadDir
  }
  const optItem = uploadDir.find(item => item.code === code);
  const client = new OSS({
    region: `oss-${ossConfig.regionId}`,
    accessKeyId: ossConfig.credentials.accessKeyId,
    accessKeySecret: ossConfig.credentials.accessKeySecret,
    stsToken: ossConfig.credentials.securityToken,
    bucket: optItem.bucket,
  })
  return new Promise((resolve) => {
    client.put(`${optItem.dir}/${file.uid}${file.name}`, file).then(res => {
      if (file.type.indexOf('image') !== -1) {
        getImageSize(file).then(size => {
          resolve(`${res.url}?x-oss-process=image/resize,h_${size.height},w_${size.width}`)
        })
      } else {
        resolve(res.url);
      }
    }).catch(err => {
      uploadDir = [];
      // return upload(file, dirName)
      console.log('上传失败：', err)
    })
  })
}

export default upload;
