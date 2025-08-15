# RAG Chatbot

Một chatbot hỏi-đáp thông minh sử dụng Retrieval-Augmented Generation (RAG) với các công nghệ:
- LangChain và LangGraph cho pipeline xử lý
- Docling để đọc nhiều loại tài liệu
- BGEM3 cho embedding
- Google Gemini 2.5 Pro thông qua OpenRouter cho ngôn ngữ mô hình lớn
- Reranking để cải thiện độ chính xác của kết quả tìm kiếm

## Yêu cầu hệ thống

- Python 3.8 trở lên
- Pip (quản lý gói Python)

## Cài đặt

1. **Clone repository** (nếu bạn đã clone rồi thì bỏ qua bước này):
   ```bash
   git clone <repository-url>
   cd ai-agent
   ```

2. **Tạo môi trường ảo** (khuyến nghị):
   ```bash
   python -m venv venv
   # Trên Windows
   venv\Scripts\activate
   # Trên macOS/Linux
   source venv/bin/activate
   ```

3. **Cài đặt dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Cấu hình API keys**:
   - Đổi tên file `.env.example` thành `.env`:
     ```bash
     cp .env.example .env
     ```
   - Mở file `.env` và thay thế `your_openrouter_api_key_here` bằng OpenRouter API key thực tế của bạn

## Sử dụng

### 1. Xử lý tài liệu

Trước khi hỏi câu hỏi, bạn cần xử lý các tài liệu mà chatbot sẽ sử dụng để trả lời:

```bash
python main.py --process path/to/document1.pdf path/to/document2.docx
```

Bạn có thể xử lý nhiều tài liệu cùng lúc:
```bash
python main.py --process document1.pdf document2.docx document3.txt
```

### 2. Hỏi câu hỏi

Sau khi đã xử lý tài liệu, bạn có thể hỏi câu hỏi:
```bash
python main.py --ask "Câu hỏi của bạn ở đây"
```

Ví dụ:
```bash
python main.py --ask "Tóm tắt nội dung chính của tài liệu"
```

### 3. Kết hợp xử lý và hỏi câu hỏi

Bạn cũng có thể kết hợp cả hai thao tác trong một lệnh:
```bash
python main.py --process document1.pdf --ask "Câu hỏi của bạn"
```

## Cấu hình

Bạn có thể điều chỉnh các tham số trong file `src/config.py`:
- `CHUNK_SIZE`: Kích thước đoạn văn bản khi chia nhỏ tài liệu
- `CHUNK_OVERLAP`: Độ chồng giữa các đoạn văn bản
- `TOP_K`: Số lượng tài liệu được truy xuất ban đầu
- `RERANK_TOP_K`: Số lượng tài liệu sau khi reranking

## Troubleshooting

1. **Lỗi import**: Đảm bảo bạn đang chạy từ thư mục gốc của project và đã kích hoạt môi trường ảo.

2. **Lỗi API key**: Kiểm tra lại file `.env` và đảm bảo API key đã được cấu hình đúng.

3. **Lỗi dependency**: Nếu có lỗi khi cài đặt dependencies, hãy thử:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

## Đóng góp

Nếu bạn muốn đóng góp cho project, vui lòng tạo pull request hoặc mở issue để thảo luận.