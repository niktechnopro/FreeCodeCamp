import axios from 'axios';
const CancelToken = axios.CancelToken;

/**
 * Axios request with timeout throw
 */
export default async function axiosRequest(config: any) : Promise<any> {
  const { timeout } = config;

  let cancel: any;
  if(timeout) {
    config.cancelToken = new CancelToken(c => cancel = c);
    setTimeout(() => {
      cancel('timeout cancel', { timeout });
    }, timeout);
  }

  return await axios(config);



import axiosRequest from '../index';

test('request', async () => {
  let resp = await axiosRequest({
    url: 'https://www.cnn.com/',
    method: 'GET'
  });
  expect(resp.status).toEqual(200);

});


test('cancel request', async () => {
  try {
    await axiosRequest({
      url: 'https://www.cnn.com/',
      method: 'GET',
      timeout: 10
    });
  } catch(error) {
    console.log({ error });
    expect(error).toEqual({'message': 'timeout cancel'});
  }
});