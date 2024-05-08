import prismaClient from "../../prisma";

interface ItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

export class AddItemService {
  async execute({order_id, product_id, amount}: ItemRequest){
    const order = await prismaClient.item.create({
      data: {
        orderId: order_id,
        productId: product_id,
        amount: amount
      }
    })

    return order;
  } 
}