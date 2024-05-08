import prismaClient from "../../prisma";

interface DetailRequest{
  order_id: string
}

export class DetailOrderService{
  async execute({ order_id }: DetailRequest){

    const order = await prismaClient.item.findMany({
      where:{
        orderId: order_id
      },
      include:{
        product: true,
        Order: true
      }
    })

    return order
  }
}