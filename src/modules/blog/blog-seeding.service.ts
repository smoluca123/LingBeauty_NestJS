import { Injectable } from '@nestjs/common';
import { BlogPostStatus } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ensureUniqueSlug } from './helpers/slug.helper';

@Injectable()
export class BlogSeedingService {
  constructor(private readonly prismaService: PrismaService) {}

  async seedBlogData(userId: string) {
    try {
      // Dữ liệu topics tiếng Việt
      const topicsData = [
        {
          name: 'Chăm sóc da',
          description: 'Hướng dẫn và mẹo chăm sóc da toàn diện',
          children: [
            { name: 'Da khô', description: 'Chăm sóc da khô hiệu quả' },
            { name: 'Da dầu', description: 'Giải pháp cho da dầu' },
            { name: 'Da nhạy cảm', description: 'Chăm sóc da nhạy cảm' },
          ],
        },
        {
          name: 'Trang điểm',
          description: 'Kỹ thuật và xu hướng trang điểm',
          children: [
            {
              name: 'Trang điểm cơ bản',
              description: 'Hướng dẫn trang điểm cho người mới',
            },
            {
              name: 'Trang điểm dự tiệc',
              description: 'Makeup cho các sự kiện đặc biệt',
            },
          ],
        },
        {
          name: 'Chăm sóc tóc',
          description: 'Bí quyết có mái tóc đẹp',
          children: [
            { name: 'Tóc khô xơ', description: 'Phục hồi tóc hư tổn' },
            { name: 'Tóc gàu', description: 'Giải pháp trị gàu hiệu quả' },
          ],
        },
        {
          name: 'Làm đẹp tự nhiên',
          description: 'Phương pháp làm đẹp từ thiên nhiên',
        },
      ];

      // Tạo topics
      const createdTopics: any[] = [];
      for (const topicData of topicsData) {
        const slug = await ensureUniqueSlug(
          this.prismaService,
          topicData.name,
          'topic',
        );

        const topic = await this.prismaService.blogTopic.create({
          data: {
            name: topicData.name,
            slug,
            description: topicData.description,
            isActive: true,
          },
        });

        createdTopics.push(topic);

        // Tạo children topics nếu có
        if (topicData.children) {
          for (const childData of topicData.children) {
            const childSlug = await ensureUniqueSlug(
              this.prismaService,
              childData.name,
              'topic',
            );

            await this.prismaService.blogTopic.create({
              data: {
                name: childData.name,
                slug: childSlug,
                description: childData.description,
                parentId: topic.id,
                isActive: true,
              },
            });
          }
        }
      }

      // Dữ liệu bài viết tiếng Việt
      const postsData = [
        {
          title: '10 Bước Chăm Sóc Da Cơ Bản Cho Làn Da Khỏe Đẹp',
          content: `
            <h2>Giới thiệu</h2>
            <p>Chăm sóc da là một phần quan trọng trong thói quen làm đẹp hàng ngày. Một làn da khỏe mạnh không chỉ giúp bạn tự tin hơn mà còn phản ánh sức khỏe tổng thể của cơ thể.</p>
            
            <h2>10 Bước Chăm Sóc Da</h2>
            <ol>
              <li><strong>Tẩy trang:</strong> Loại bỏ hoàn toàn lớp trang điểm và bụi bẩn</li>
              <li><strong>Rửa mặt:</strong> Làm sạch sâu với sữa rửa mặt phù hợp</li>
              <li><strong>Toner:</strong> Cân bằng độ pH cho da</li>
              <li><strong>Essence:</strong> Cung cấp dưỡng chất cho da</li>
              <li><strong>Serum:</strong> Điều trị các vấn đề da chuyên sâu</li>
              <li><strong>Kem mắt:</strong> Chăm sóc vùng da mỏng manh quanh mắt</li>
              <li><strong>Kem dưỡng:</strong> Khóa ẩm và nuôi dưỡng da</li>
              <li><strong>Kem chống nắng:</strong> Bảo vệ da khỏi tia UV (ban ngày)</li>
              <li><strong>Mặt nạ:</strong> Chăm sóc đặc biệt 2-3 lần/tuần</li>
              <li><strong>Tẩy tế bào chết:</strong> Loại bỏ da chết 1-2 lần/tuần</li>
            </ol>
            
            <h2>Kết luận</h2>
            <p>Kiên trì thực hiện đầy đủ các bước chăm sóc da sẽ giúp bạn có được làn da khỏe đẹp, rạng rỡ.</p>
          `,
          excerpt:
            'Hướng dẫn chi tiết 10 bước chăm sóc da cơ bản giúp bạn có làn da khỏe đẹp, rạng rỡ mỗi ngày.',
          tags: ['chăm sóc da', 'skincare', 'làm đẹp', 'da khỏe'],
          topicIndex: 0,
        },
        {
          title: 'Cách Chọn Kem Chống Nắng Phù Hợp Với Từng Loại Da',
          content: `
            <h2>Tại sao cần chống nắng?</h2>
            <p>Kem chống nắng là bước quan trọng nhất trong quy trình chăm sóc da. Tia UV không chỉ gây cháy nắng mà còn là nguyên nhân chính gây lão hóa da, nám, tàn nhang và ung thư da.</p>
            
            <h2>Chọn kem chống nắng theo loại da</h2>
            
            <h3>Da dầu</h3>
            <p>Nên chọn kem chống nắng dạng gel, không dầu, có khả năng kiểm soát dầu. Tìm các sản phẩm có chứa silica, niacinamide.</p>
            
            <h3>Da khô</h3>
            <p>Ưu tiên kem chống nắng dạng cream, có thành phần dưỡng ẩm như hyaluronic acid, glycerin, ceramide.</p>
            
            <h3>Da nhạy cảm</h3>
            <p>Chọn kem chống nắng vật lý (physical sunscreen) với zinc oxide hoặc titanium dioxide, không chứa hương liệu và cồn.</p>
            
            <h3>Da hỗn hợp</h3>
            <p>Có thể dùng kem chống nắng dạng lotion nhẹ, cân bằng độ ẩm.</p>
            
            <h2>Lưu ý khi sử dụng</h2>
            <ul>
              <li>Thoa kem chống nắng 15-30 phút trước khi ra ngoài</li>
              <li>Sử dụng đủ lượng (khoảng 2mg/cm²)</li>
              <li>Thoa lại sau mỗi 2 giờ hoặc sau khi tiếp xúc với nước</li>
              <li>Chọn SPF tối thiểu 30 PA+++</li>
            </ul>
          `,
          excerpt:
            'Hướng dẫn chi tiết cách chọn và sử dụng kem chống nắng phù hợp với từng loại da để bảo vệ da tối ưu.',
          tags: ['kem chống nắng', 'chống nắng', 'bảo vệ da', 'SPF'],
          topicIndex: 0,
        },
        {
          title: 'Xu Hướng Trang Điểm 2024: Tự Nhiên Và Tươi Tắn',
          content: `
            <h2>Xu hướng trang điểm năm 2024</h2>
            <p>Năm 2024 đánh dấu sự trở lại của phong cách trang điểm tự nhiên, tôn vinh vẻ đẹp nguyên bản của mỗi người.</p>
            
            <h2>Các xu hướng nổi bật</h2>
            
            <h3>1. No-Makeup Makeup</h3>
            <p>Trang điểm như không trang điểm, tập trung vào làn da trong suốt, tự nhiên với lớp nền mỏng nhẹ.</p>
            
            <h3>2. Dewy Skin</h3>
            <p>Làn da ẩm mượt, căng bóng tự nhiên thay vì lớp phấn mờ hoàn toàn.</p>
            
            <h3>3. Soft Glam</h3>
            <p>Trang điểm nhẹ nhàng nhưng vẫn nổi bật với màu mắt pastel, môi nude hồng.</p>
            
            <h3>4. Bold Lips</h3>
            <p>Môi đậm màu trở lại với các tông đỏ, cam, nâu đất.</p>
            
            <h3>5. Natural Brows</h3>
            <p>Lông mày tự nhiên, rậm rạp thay vì vẽ quá sắc nét.</p>
            
            <h2>Sản phẩm cần có</h2>
            <ul>
              <li>Kem nền nhẹ hoặc BB cream</li>
              <li>Highlighter dạng lỏng</li>
              <li>Phấn má hồng tự nhiên</li>
              <li>Son dưỡng có màu</li>
              <li>Mascara làm dài mi</li>
            </ul>
          `,
          excerpt:
            'Khám phá các xu hướng trang điểm hot nhất năm 2024 với phong cách tự nhiên, tươi tắn và tôn vinh vẻ đẹp nguyên bản.',
          tags: ['trang điểm', 'makeup', 'xu hướng 2024', 'làm đẹp'],
          topicIndex: 1,
        },
        {
          title: 'Bí Quyết Trang Điểm Lâu Trôi Cho Ngày Dài',
          content: `
            <h2>Chuẩn bị da trước khi trang điểm</h2>
            <p>Làn da được chuẩn bị kỹ càng là nền tảng cho lớp trang điểm lâu trôi.</p>
            
            <h2>Các bước trang điểm lâu trôi</h2>
            
            <h3>Bước 1: Dưỡng da</h3>
            <p>Làm sạch, toner, serum và kem dưỡng ẩm. Đợi 5-10 phút để da hấp thụ hoàn toàn.</p>
            
            <h3>Bước 2: Primer</h3>
            <p>Sử dụng primer phù hợp với loại da để tạo lớp nền mịn màng, giúp makeup bám tốt hơn.</p>
            
            <h3>Bước 3: Kem nền</h3>
            <p>Chọn kem nền long-wear, thoa mỏng nhiều lớp thay vì một lớp dày.</p>
            
            <h3>Bước 4: Che khuyết điểm</h3>
            <p>Dùng concealer che khuyết điểm, set bằng phấn phủ mỏng.</p>
            
            <h3>Bước 5: Phấn phủ</h3>
            <p>Set toàn bộ lớp nền bằng phấn phủ, tập trung vào vùng chữ T.</p>
            
            <h3>Bước 6: Trang điểm mắt</h3>
            <p>Dùng eye primer trước khi đánh phấn mắt. Chọn phấn mắt dạng cream hoặc long-wear.</p>
            
            <h3>Bước 7: Son môi</h3>
            <p>Dùng chì kẻ môi, thoa son, thấm giấy ăn, phủ phấn, thoa lại lớp son thứ 2.</p>
            
            <h3>Bước 8: Setting spray</h3>
            <p>Xịt setting spray để khóa lớp makeup, giúp lâu trôi cả ngày.</p>
            
            <h2>Mẹo thêm</h2>
            <ul>
              <li>Giấy thấm dầu thay vì phủ phấn nhiều lần</li>
              <li>Mang theo son và phấn phủ để touch-up</li>
              <li>Tránh chạm tay vào mặt</li>
            </ul>
          `,
          excerpt:
            'Hướng dẫn chi tiết các bước và bí quyết trang điểm lâu trôi, giúp bạn tự tin suốt cả ngày dài.',
          tags: ['trang điểm', 'makeup lâu trôi', 'mẹo makeup', 'làm đẹp'],
          topicIndex: 1,
        },
        {
          title: '5 Cách Phục Hồi Tóc Hư Tổn Tại Nhà Hiệu Quả',
          content: `
            <h2>Nguyên nhân tóc hư tổn</h2>
            <p>Tóc hư tổn có thể do nhiều nguyên nhân: nhuộm, uốn, duỗi, sấy nhiệt độ cao, thiếu dưỡng chất, tác động môi trường...</p>
            
            <h2>5 Cách phục hồi tóc tại nhà</h2>
            
            <h3>1. Ủ tóc bằng dầu dừa</h3>
            <p>Dầu dừa giàu acid béo, giúp nuôi dưỡng tóc từ sâu bên trong. Thoa dầu dừa lên tóc, ủ 30 phút rồi gội sạch.</p>
            
            <h3>2. Mặt nạ trứng gà</h3>
            <p>Trứng gà giàu protein, giúp phục hồi cấu trúc tóc. Đánh 1-2 quả trứng, thoa lên tóc, ủ 20 phút.</p>
            
            <h3>3. Dưỡng tóc bằng bơ</h3>
            <p>Bơ chứa vitamin E, giúp tóc mềm mượt. Nghiền bơ chín, thoa lên tóc, ủ 30 phút.</p>
            
            <h3>4. Xả tóc bằng giấm táo</h3>
            <p>Giấm táo giúp cân bằng pH, làm tóc bóng mượt. Pha loãng giấm táo với nước, xả sau khi gội.</p>
            
            <h3>5. Sử dụng serum dưỡng tóc</h3>
            <p>Serum chứa keratin, argan oil giúp phục hồi tóc nhanh chóng. Thoa lên tóc ẩm sau khi gội.</p>
            
            <h2>Lưu ý</h2>
            <ul>
              <li>Hạn chế sử dụng nhiệt độ cao</li>
              <li>Cắt tỉa đầu tóc định kỳ</li>
              <li>Dùng dầu gội phù hợp với tóc hư tổn</li>
              <li>Uống đủ nước, ăn nhiều rau xanh</li>
            </ul>
          `,
          excerpt:
            '5 phương pháp đơn giản, hiệu quả giúp phục hồi tóc hư tổn ngay tại nhà với nguyên liệu tự nhiên.',
          tags: [
            'chăm sóc tóc',
            'tóc hư tổn',
            'phục hồi tóc',
            'làm đẹp tự nhiên',
          ],
          topicIndex: 2,
        },
        {
          title: 'Top 10 Nguyên Liệu Tự Nhiên Làm Đẹp Da Hiệu Quả',
          content: `
            <h2>Làm đẹp từ thiên nhiên</h2>
            <p>Thiên nhiên cung cấp vô số nguyên liệu quý giá giúp làm đẹp da an toàn, hiệu quả và tiết kiệm.</p>
            
            <h2>10 Nguyên liệu tự nhiên</h2>
            
            <h3>1. Mật ong</h3>
            <p>Kháng khuẩn, dưỡng ẩm, làm sáng da. Thoa trực tiếp hoặc pha với sữa chua.</p>
            
            <h3>2. Nha đam (Aloe Vera)</h3>
            <p>Làm dịu da, trị mụn, dưỡng ẩm. Lấy gel nha đam thoa lên da.</p>
            
            <h3>3. Nghệ</h3>
            <p>Kháng viêm, làm sáng da, trị thâm. Pha bột nghệ với sữa tươi hoặc mật ong.</p>
            
            <h3>4. Chanh</h3>
            <p>Vitamin C, làm sáng da, se khít lỗ chân lông. Pha loãng nước chanh trước khi dùng.</p>
            
            <h3>5. Dầu dừa</h3>
            <p>Dưỡng ẩm sâu, chống lão hóa. Massage nhẹ lên da.</p>
            
            <h3>6. Cà chua</h3>
            <p>Lycopene chống oxy hóa, làm sáng da. Cắt lát mỏng đắp lên mặt.</p>
            
            <h3>7. Dưa leo</h3>
            <p>Làm dịu, dưỡng ẩm, giảm bọng mắt. Cắt lát đắp lên da.</p>
            
            <h3>8. Bơ</h3>
            <p>Vitamin E, dưỡng ẩm, chống lão hóa. Nghiền bơ thoa lên da.</p>
            
            <h3>9. Yến mạch</h3>
            <p>Tẩy tế bào chết nhẹ nhàng, làm dịu da. Pha với sữa chua hoặc mật ong.</p>
            
            <h3>10. Trà xanh</h3>
            <p>Chống oxy hóa, giảm viêm, se khít lỗ chân lông. Dùng nước trà xanh làm toner.</p>
            
            <h2>Lưu ý</h2>
            <p>Test thử trên da tay trước khi dùng. Ngưng sử dụng nếu có dấu hiệu kích ứng.</p>
          `,
          excerpt:
            'Khám phá 10 nguyên liệu tự nhiên dễ tìm, giúp làm đẹp da hiệu quả, an toàn và tiết kiệm chi phí.',
          tags: [
            'làm đẹp tự nhiên',
            'nguyên liệu tự nhiên',
            'chăm sóc da',
            'mặt nạ tự nhiên',
          ],
          topicIndex: 3,
        },
      ];

      // Tạo bài viết
      const createdPosts: any[] = [];
      for (const postData of postsData) {
        const slug = await ensureUniqueSlug(
          this.prismaService,
          postData.title,
          'post',
        );

        const post = await this.prismaService.blogPost.create({
          data: {
            title: postData.title,
            slug,
            content: postData.content,
            excerpt: postData.excerpt,
            tags: postData.tags,
            topicId: createdTopics[postData.topicIndex].id,
            authorId: userId,
            status: BlogPostStatus.PUBLISHED,
            publishedAt: new Date(),
            metaTitle: postData.title,
            metaDescription: postData.excerpt,
          },
        });

        createdPosts.push(post);
      }

      return {
        topics: createdTopics.length,
        posts: createdPosts.length,
        message: 'Seeding dữ liệu blog thành công',
      };
    } catch (error) {
      throw error;
    }
  }
}
