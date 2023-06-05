export function generateTitle(title) {
  const hasKey = this.$te('route.' + title) //this.$te 用于检查是否存在对应的翻译键值

  if (hasKey) {
    const translatedTitle = this.$t('route.' + title) //this.$t 用于获取对应键值的翻译文本
    return translatedTitle
  }
  return title
}
