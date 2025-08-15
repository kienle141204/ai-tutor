import { getSpaces } from './spaceService';
import { getDocuments } from './documentService';
import { getConversations } from './conversationService';

// Hàm gọi API để lấy tất cả dữ liệu cần thiết cho dashboard
export const getDashboardData = async () => {
  try {
    // Gọi đồng thời các API để lấy dữ liệu
    const [spaces, documents, conversations] = await Promise.all([
      getSpaces(),
      getDocuments(),
      getConversations()
    ]);

    // Xử lý dữ liệu spaces để thêm thông tin thống kê
    const spacesWithStats = spaces.map(space => {
      // Đếm số documents trong space
      const spaceDocuments = documents.filter(doc => doc.space_id === space.id).length;
      
      // Đếm số conversations trong space
      const spaceConversations = conversations.filter(conv => conv.space_id === space.id).length;
      
      // Lấy ngày tạo từ created_at (chuyển đổi từ chuỗi ISO sang định dạng mong muốn)
      const date = new Date(space.created_at);
      const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
      
      return {
        ...space,
        documents: spaceDocuments,
        conversations: spaceConversations,
        date: formattedDate
      };
    });

    // Tính tổng số lượng
    const totalSpaces = spaces.length;
    const totalDocuments = documents.length;
    const totalConversations = conversations.length;

    return {
      spaces: spacesWithStats,
      stats: {
        totalSpaces,
        totalDocuments,
        totalConversations
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};