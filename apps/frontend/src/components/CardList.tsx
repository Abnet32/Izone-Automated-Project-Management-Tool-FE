// import Image from "next/image";
// import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";

// const CardList = ({title}:{title:string} )=> {
//     const List = title === "popular content"? popularContent:latestTransactions
//     return (
//         <div className ="">
//            <h1 className="text-lg font-medium mb-6">{title}</h1>
//            <div className="flex flex-col gap-2">
//             {List.map ((item=>
//               <Card key={item.id}>
//                 <div className="w-12 h-12 rounded-sm relative overflow-hidden">
//                 <Image src = {item.image} alt={item.title} fill className="object-cover" />
//                 </div>
            
//                 <CardContent>
//                     <CardTitle> {item.title} </CardTitle>
//                 </CardContent>

//                 <CardFooter>
//                 {item.count/1000}key
//                 </CardFooter>
             

//               </Card>

//             ))}
//            </div>
//             </div>
//     )
// }
// export default CardList;