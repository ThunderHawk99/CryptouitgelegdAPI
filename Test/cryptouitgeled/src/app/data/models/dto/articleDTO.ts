import { TagDTO } from './tagDTO';
export class ArticleDTO{
    title: string
    image: string
    description:string
    body: {id: number}
    tags: TagDTO[]

    constructor(){
        this.title = "TEST";
        this.image = "https://i.imgur.com/IPUxwyo.jpg";
        this.description = "A decentralized video protocol on Ethereum. Livepeer rewards parties for processing video content securely at reasonable rates. Find out how the ecosystem works."
        this.tags = []
        this.tags.push(new TagDTO("LAYER1"))
        this.body = {
            id: 3
        }
    }

}