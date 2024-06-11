import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  GetObjectCommandOutput,
  HeadObjectCommand,
  HeadObjectCommandOutput,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class FileService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(pictures: Express.Multer.File[], postId: number) {
    console.log(pictures);
    try {
      for (const picture of pictures) {
        await this.s3Client.send(
          new PutObjectCommand({
            Bucket: 'sharehub-bucket-sa',
            Key: picture.originalname,
            Body: picture.buffer,
            Metadata: {
              postId: postId.toString(),
            },
          }),
        );
      }
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Erro ao salvar imagens: ', e);
    }
  }

  async getImagesByPostId(postId: number) {
    try {
      const listObjectsCommand = new ListObjectsV2Command({
        Bucket: 'sharehub-bucket-sa',
      });
      const listObjectsResponse: ListObjectsV2CommandOutput =
        await this.s3Client.send(listObjectsCommand);

      if (!listObjectsResponse.Contents) {
        return [];
      }

      const images: Buffer[] = [];

      for (const object of listObjectsResponse.Contents) {
        const headObjectCommand = new HeadObjectCommand({
          Bucket: 'sharehub-bucket-sa',
          Key: object.Key!,
        });
        const headObjectResponse: HeadObjectCommandOutput =
          await this.s3Client.send(headObjectCommand);

        if (
          headObjectResponse.Metadata &&
          headObjectResponse.Metadata.postid === postId.toString()
        ) {
          const getObjectCommand = new GetObjectCommand({
            Bucket: 'sharehub-bucket-sa',
            Key: object.Key!,
          });
          const getObjectResponse: GetObjectCommandOutput =
            await this.s3Client.send(getObjectCommand);

          const stream = getObjectResponse.Body as Readable;
          const buffer = await this.streamToBuffer(stream);

          images.push(buffer);
        }
      }
      return images;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Erro ao recuperar imagens: ', e);
    }
  }

  private streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }
}
