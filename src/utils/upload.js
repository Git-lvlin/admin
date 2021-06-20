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

let client = null;

const upload = async (file, dirName) => {
  if (!client) {
    const res = await getConfig();
    const { ossConfig } = res.data
    client = new OSS({
      region: `oss-${ossConfig.regionId}`,
      accessKeyId: ossConfig.credentials.accessKeyId,
      accessKeySecret: ossConfig.credentials.accessKeySecret,
      stsToken: ossConfig.credentials.securityToken,
      bucket: ossConfig.bucket,
    })
  }
  return new Promise((resolve) => {
    client.put(`${dirName}/${file.uid}${file.name}`, file).then(res => {
      if (file.type.indexOf('image') !== -1) {
        getImageSize(file).then(size => {
          resolve(`${res.url}?x-oss-process=image/resize,h_${size.height},w_${size.width}`)
        })
      } else {
        resolve(res.url);
      }
    }).catch(err => {
      client = null;
      // return upload(file, dirName)
      console.log('上传失败：', err)
    })
  })
}

export default upload;
