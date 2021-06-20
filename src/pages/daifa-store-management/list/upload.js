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
  var reader = new FileReader();
	reader.onload = function(e) {
		var data = e.target.result;
		var workbook = XLSX.read(data, {type: 'buffer'});
		// if(callback) callback(workbook);
	};
	reader.readAsBinaryString(file);
  
  return new Promise((resolve) => {
    client.put(`${dirName}/${workbook.uid}${workbook.name}`, workbook).then(res => {
      if (workbook.type.indexOf('image') !== -1) {
        getImageSize(workbook).then(size => {
          resolve(`${res.url}?x-oss-process=image/resize,h_${size.height},w_${size.width}`)
        })
      }
      resolve(res.url);
    }).catch(err => {
      client = null;
      // return upload(file, dirName)
      console.log('上传失败：', err)
    })
  })
}

export default upload;
