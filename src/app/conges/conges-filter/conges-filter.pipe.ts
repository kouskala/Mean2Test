import {PipeTransform,Pipe} from '@angular/core';
import {IConges} from '../conges.interface'
@Pipe({
    name:'congesFilter'
})
export class CongesFilterPipe implements PipeTransform{
transform(value :IConges[], filtetBy:string):IConges[]{
    filtetBy= filtetBy? filtetBy.toLocaleLowerCase():null;//search in each product if is the same
    return filtetBy ? value.filter((post:IConges)=>post.title.toLocaleLowerCase().indexOf(filtetBy) !==-1) : value;
}

}