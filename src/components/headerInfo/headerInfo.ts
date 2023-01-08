
import { IProduct } from "../../types/types"

export class HeaderInfo{
  showCount(array:IProduct[]):void{
    const countOfProdSpan = document.getElementById("found") as HTMLElement;
    let countOfProducts: number = array.length;
    countOfProdSpan.innerHTML = countOfProducts.toString();
  }
}