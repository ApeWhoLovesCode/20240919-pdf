/** 生成随机字符串 */
export const randomStr = (v) =>
  `${v ? v + "-" : ""}${Math.ceil(Math.random() * 10e5).toString(
    36
  )}-${Date.now().toString(36)}`;
