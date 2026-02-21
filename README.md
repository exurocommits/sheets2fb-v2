# Sheets2FB - Convert Google Sheets to Facebook Posts

## 🚀 Features

- **Upload & Convert**: Upload Google Sheets (CSV, XLS, XLSX) and auto-convert to Facebook posts
- **Batch Processing**: Create hundreds of Facebook posts in seconds
- **Image Support**: Include image URLs for each post
- **Smart Validation**: Checks for valid content before posting
- **Detailed Reports**: Track success/failure of each post
- **Schedule Posts**: Option to schedule instead of posting immediately

## 📦 Installation

```bash
npm install
cp .env.example .env
# Edit .env with your Facebook credentials
npm run dev
```

## 🔑 Required Environment Variables

### Facebook API
- `FACEBOOK_PAGE_ID`: Your Facebook Page ID
- `FACEBOOK_PAGE_ACCESS_TOKEN`: Page access token with `pages_read_engagement` and `pages_manage_posts` permissions
- `FACEBOOK_APP_ID`: Your Facebook App ID
- `FACEBOOK_APP_SECRET`: Your Facebook App Secret

### Supabase (Optional)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key

### App
- `NEXT_PUBLIC_APP_URL`: Your app URL

## 🔑 Setting Up Facebook API

1. Create a Facebook App at [developers.facebook.com](https://developers.facebook.com)
2. Add "Facebook Login" product
3. Get your App ID and App Secret
4. Create a Page Access Token:
   - Go to Graph API Explorer
   - Select your app and page
   - Request `pages_read_engagement` and `pages_manage_posts` permissions
   - Generate the access token
5. Copy your Page ID from your page settings

## 📋 Google Sheets Format

Your Google Sheet should have these columns:

| Column | Required | Description |
|--------|----------|-------------|
| A | Yes | Post content (text) |
| B | No | Image URL (optional) |
| C | No | Scheduled date/time (optional) |

**Example:**
```
Post Content | Image URL | Scheduled Date
Hello World! | https://example.com/image.jpg | 2026-03-01 10:00
Another post | | 2026-03-02 14:00
```

## 🚀 Deployment

### Deploy to Vercel

```bash
vercel login
vercel
```

## 📝 How It Works

1. **Upload**: User uploads a Google Sheets export (CSV or Excel)
2. **Parse**: Parse the file and extract post data
3. **Validate**: Check for valid content and image URLs
4. **Post**: Create posts on Facebook Page via API
5. **Track**: Log success/failure for each post
6. **Report**: Show detailed results to user

## 🔧 API Endpoints

### Upload & Process
- `POST /api/upload` - Upload and process file
- `POST /api/convert` - Convert to Facebook posts

### Facebook API
- `POST /api/facebook/post` - Create a single post
- `POST /api/facebook/batch` - Create multiple posts

### Status & Reports
- `GET /api/status/:jobId` - Check processing status
- `GET /api/reports/:jobId` - Get detailed report

## 💳 Pricing

| Tier | Price | Posts | Features |
|------|-------|-------|----------|
| Free | $0 | 50/month | Basic posting, no scheduling |
| Pro | $19/mo | 500/month | Scheduling, analytics |
| Business | $49/mo | Unlimited | Bulk processing, API access |

## 🤝 Support

For issues and questions, please open a GitHub issue.

## 📄 License

MIT
