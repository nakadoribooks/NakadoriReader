import XmlDom from 'xmldom';

export default class Article{
    constructor(xml){
        this.xml = xml
        this.selected = false
    }

    static createFromRssString(rssString){
        var parser = new XmlDom.DOMParser()
        var xml = parser.parseFromString(rssString)
        var itemList = xml.getElementsByTagName("item")
        
        var articleList = []
        for(var i=0,max=itemList.length;i<max;i++){
            var itemData = itemList[i]
            
            var article = new Article(itemData)
            articleList.push(article)
        }

        return articleList
    }

    get title () {
        return this.xml.getElementsByTagName("title").item(0).textContent
    }

    get link () {
        return this.xml.getElementsByTagName("guid").item(0).textContent
    }

    get content () {
        return  this.xml.getElementsByTagName("content:encoded").item(0).textContent
    }

    get pubDate(){
        return new Date(this.xml.getElementsByTagName("pubDate").item(0).textContent)
    }

    get dateString(){
        var date = this.pubDate
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + "/" + m + "/" + d;
    }

}