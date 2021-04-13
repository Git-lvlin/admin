import OSS from 'ali-oss';
import request from '@/utils/request';

const getConfig = (params = {}, options = {}) => {
  return request('/auth/goods/product/getConfig', {
    method: 'POST',
    data: params,
    ...options
  });
}

let client = null;

const getImageSize = (file) => {

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (theFile) => {
      const image = new Image()
      image.src = theFile.target.result
      image.onload = function () {
        const { width, height } = this;
        resolve({ width, height })
      }
    }
  });
}

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
  return client.put(`${dirName}/${file.uid}${file.name}`, file).then(res => {
    if (file.type.indexOf('image') !== -1) {
      return getImageSize(file).then(size => {
        return `${res.url}?x-oss-process=image/resize,m_lfit,h_${size.height},w_${size.width}`
      })
    }
    return res.url;
  }).catch(err => {
    console.log('上传失败：', err)
  })

}

export default upload;
