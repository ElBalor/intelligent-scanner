# Intelligent Scanner

An AI-powered application that extracts structured data from invoices and receipts using OCR technology.

## 🚀 Features

- **OCR Processing**: Uses PaddleOCR for accurate text extraction from images and PDFs
- **Smart Parsing**: Automatically extracts vendor, date, total amount, and category
- **Modern UI**: Beautiful, responsive interface built with Next.js 14 and Tailwind CSS
- **Data Export**: Download extracted data as JSON or CSV
- **Real-time Processing**: Live feedback during document processing

## 🏗 Architecture

```
User uploads PDF/image → Frontend (Next.js)
        ↓
Axios POST /extract (FastAPI backend)
        ↓
Backend runs PaddleOCR → extracts text
        ↓
Regex / classifier parses vendor, date, total, category
        ↓
Response JSON to frontend
        ↓
Frontend displays structured data + download options
```

## 🛠 Tech Stack

### Backend
- **Python 3.10+**
- **FastAPI** - Modern, fast web framework
- **PaddleOCR** - OCR engine for text extraction
- **Pandas** - Data manipulation
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

## 📦 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎯 Usage

1. Open your browser and go to `http://localhost:3000`
2. Upload an image or PDF file using the drag & drop area
3. Wait for the AI to process and extract data
4. Review the extracted information (vendor, date, amount, category)
5. Download the results as JSON or CSV

## 📋 API Endpoints

- `GET /` - Health check
- `POST /extract` - Upload file and extract structured data
- `GET /health` - Detailed health status

## 🔧 Configuration

### Backend Configuration
- Modify `backend/main.py` to adjust OCR settings
- Update CORS origins in the FastAPI app if needed
- Change port in the uvicorn.run() call if required

### Frontend Configuration
- Update API URL in `frontend/app/page.tsx` if backend runs on different port
- Modify Tailwind configuration in `frontend/tailwind.config.js`
- Adjust file size limits in `frontend/components/FileUpload.tsx`

## 🚀 Deployment

### Backend Deployment
- **Render**: Connect your GitHub repo and deploy
- **Railway**: One-click deployment with automatic scaling
- **AWS EC2**: Deploy with Docker or directly with Python

### Frontend Deployment
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag & drop or connect repository
- **AWS S3 + CloudFront**: Static hosting with CDN

## 📝 Development Roadmap

- [x] Set up FastAPI backend with OCR
- [x] Implement text parsing and extraction
- [x] Create Next.js frontend with modern UI
- [x] Add file upload and processing
- [x] Implement data export functionality
- [ ] Add MongoDB integration for history
- [ ] Implement batch processing
- [ ] Add user authentication
- [ ] Create admin dashboard
- [ ] Add more OCR engines (EasyOCR, Tesseract)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- PaddleOCR for excellent OCR capabilities
- FastAPI for the amazing web framework
- Next.js team for the great React framework
- Tailwind CSS for the utility-first CSS approach
