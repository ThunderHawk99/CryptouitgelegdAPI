export class TagDTO {
    name: string
    isActive: boolean = false

    constructor(name: string){
        this.name = name
    }
}