import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import Redis from 'ioredis';

import { IsNotEmpty } from 'class-validator';

const redis = new Redis();
redis.set("news", "")
export class CreateNewsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
const getRandomAuthor = () => {
  const authors = { author1: 0, author2: 0, author3: 0 };
  const nameAuthors = Object.keys(authors)
  const randomNumber = Math.round(Math.random() * (nameAuthors.length - 1));
  return nameAuthors[randomNumber]
}



@Controller('news')
export class NewsController {
  
 
  @Get()
  async getNews() {
    const results = await redis.get("news");
    if (results) {
      return JSON.parse(results);
    }

    return new Promise(resolve => {
      const news = Object.keys([...Array(20)])
        .map(key => Number(key) + 1)
        .map(n => ({
          id: n,
          title: `Важная новость ${n}`,
          description: (rand => ([...Array(rand(1000))].map(() => rand(10**16).toString(36).substring(rand(10))).join(' ')))(max => Math.ceil(Math.random() * max)),
          createdAt: Date.now(),
          author: getRandomAuthor()
        }))
      redis.set("news", JSON.stringify(news));
      setTimeout(() => {
        resolve(news);
      }, 100)
    });
  }

  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() peaceOfNews: CreateNewsDto) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Новость успешно создана', peaceOfNews);
        resolve({ id: Math.ceil(Math.random() * 1000), ...peaceOfNews });
      }, 100)
    });
  }
  @Get("test-redis")
  testRedis() {
    console.log('you was here')
    return new Promise(resolve => {
      setTimeout(() => {resolve("test-redis")}, 100)
    })
  }
  @Get("top-author")
  async getTopAuthor() {
    const results = await redis.get("news");
    if (results) {
      return JSON.parse(results);
    }

    return new Promise(resolve => {
      const news = Object.keys([...Array(20)])
        .map(key => Number(key) + 1)
        .map(n => ({
          id: n,
          title: `Важная новость ${n}`,
          description: (rand => ([...Array(rand(1000))].map(() => rand(10**16).toString(36).substring(rand(10))).join(' ')))(max => Math.ceil(Math.random() * max)),
          createdAt: Date.now(),
          author: getRandomAuthor()
        }))
      redis.set("news", JSON.stringify(news));
      setTimeout(() => {
        resolve(news);
      }, 100)
    });
  }
  
}
