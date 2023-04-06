import { Body, Controller, Get, Header, Post } from '@nestjs/common';

import { IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

@Controller('news')
export class NewsController {

   private readonly news1 = Object.keys([...Array(20)])
        .map(key => Number(key) + 1)
        .map(n => ({
          id: n,
          title: `Важная новость ${n}`,
          description: (rand => ([...Array(rand(1000))].map(() => rand(10**16).toString(36).substring(rand(10))).join(' ')))(max => Math.ceil(Math.random() * max)),
          createdAt: Date.now()
        }))

  @Get()
  async getNews() {
    return new Promise(resolve => {
      const news = this.news1
      // const news = Object.keys([...Array(20)])
      //   .map(key => Number(key) + 1)
      //   .map(n => ({
      //     id: n,
      //     title: `Важная новость ${n}`,
      //     description: (rand => ([...Array(rand(1000))].map(() => rand(10**16).toString(36).substring(rand(10))).join(' ')))(max => Math.ceil(Math.random() * max)),
      //     createdAt: Date.now()
      //   }))

      setTimeout(() => {
        resolve(news);
      }, 100)
    });
  }

  @Post()
  @Header('Cache-Control', 'max-age=600, public')
  create(@Body() peaceOfNews: CreateNewsDto) {
    return new Promise(resolve => {
      setTimeout(() => {
        let lengthNews1 = this.news1.length;
        let lastId = this.news1[lengthNews1 - 1].id;
        // console.log('lengthNews1', lengthNews1);
        // console.log('lastId', lastId);
        this.news1.push({
        id: lastId + 1,
        title: peaceOfNews.title,
        description: peaceOfNews.description,
        createdAt: Date.now()
       });
      //  let dat = this.news1[lengthNews1 - 1].createdAt;
      //  let dat1 = Intl.DateTimeFormat('ru-RU').format(dat);
       //console.log(dat1);
        console.log('Новость успешно создана', peaceOfNews);
        resolve({ id: Math.ceil(Math.random() * 1000), ...peaceOfNews });
      }, 100)
    });
  }
}
