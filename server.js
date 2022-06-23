const TelegramApi=require('node-telegram-bot-api')

const api='5545885926:AAFOtN2H5kUj7JmzDdiQXn_1-JzzYP506vk'

const bot =new TelegramApi(api,{polling:true})



process.on("unhandledRejection",err => {
  console.log(err.name, err.message)
})
// comandalar

bot.setMyCommands([
  {command:'/start',description:"Boshlang'ich tanishuv"},
  {command:"/info",description:'Siz haqingizda m\'alumot '},
  {command:'/game',description:'o\'yinni boshlash'}
])

// btn lar jadvali

const gameOptions={
  reply_markup:JSON.stringify({
    inline_keyboard:[
      [{text:'1',callback_data:'1'},{text:'2',callback_data:'2'},{text:'3',callback_data:'3'}],
      [{text:'2',callback_data:'2'},{text:'5',callback_data:'5'},{text:'6',callback_data:'6'}],
      [{text:'7',callback_data:'7'},{text:'8',callback_data:'8'},{text:'9',callback_data:'9'}],
      [{text:'0',callback_data:'0'}]
    ]
  })
}

const start=()=>{
  
const chats=[]
  bot.on('message',async obj=>{
      const text=obj.text 
      const name=obj.from.first_name;
      const chatId=obj.chat.id;
      if(text==='/start'){
        return bot.sendMessage(chatId,'Welcome')
      }
      if(text==='/info'){
        return bot.sendMessage(chatId,`Hello my dear friend ${name}`)
      }
      if(text==='/game'){
        await bot.sendMessage(chatId,'Siz 0 dan 9 gacha son tanladim')
        const number=Math.floor(Math.random()*10)
        chats.push(number)
       
        return bot.sendMessage(chatId,'Sonni toping',gameOptions)
      }
      else{
        return bot.sendMessage(chatId,'Bunday kamanda mavjud emas ...') 
      }
     
    })

bot.on('callback_query',obj=>{
  console.log(obj)
  
 
  
  const number=chats[chats.length-1]
  console.log(chats[chats.length-1])
  console.log(obj.message.chat.id)
  console.log(typeof number)
  console.log(typeof +obj.data)
  obj.data
  if(+obj.data===number){
    return bot.sendMessage(obj.message.chat.id,`Tabriklaymiz siz to\'g\'ri topdingiz🥳.${number} soni edi`)
  }
  else{
    return bot.sendMessage(obj.message.chat.id,`Afsuski siz topolmadingiz😛`)
  }

})

}

start()