import { extract } from '@extractus/article-extractor'

const getText = async (url:string) => { 
    try {
        const article = await extract(url)
        console.log(article)
        return article
      } catch (err) {
        console.error(err)
        return ""
      }
}

export default getText;