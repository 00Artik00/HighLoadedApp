import { Body, Controller, Get, Header, Post } from '@nestjs/common';

import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';


export class CreateNewsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
const newsDataShema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  createdAt: Number,
});
const newsModel = mongoose.model('News', newsDataShema);

@Controller('news')
export class NewsController {
  @Get()
  async getNews() {
    const news = await newsModel.find({}).exec();
    if (news) {
        return news
    } else {
      return "Новостей нет";
      }
      
  }

  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() peaceOfNews: CreateNewsDto) {
    
    return new Promise(resolve => {
      console.log('Новость успешно создана', peaceOfNews);
      const news = { id: Math.ceil(Math.random() * 1000), ...peaceOfNews };
      const newsItem = new newsModel(news);
      newsItem.save();
      resolve(news);
    });
  }
}
