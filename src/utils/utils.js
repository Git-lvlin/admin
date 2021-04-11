import { parse } from 'querystring';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const arrayToTree = (list, parId = 0) => {
  const len = list.length
  function loop(pid) {
    const res = [];
    for (let i = 0; i < len; i += 1) {
      const item = list[i]
      if (item.pid === pid) {
        item.children = loop(item.id)
        res.push(item)
      }
    }
    return res.length ? res : null
  }
  return loop(parId)
}
