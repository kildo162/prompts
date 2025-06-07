# AI Prompts Collection

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A professional collection of AI prompts organized by categories, optimized for software development and technical tasks. This platform provides easy access to expert-curated prompts for enhancing your development workflow.

## 🌟 Features

- 📱 **Responsive Design**: Works seamlessly on all devices
- 🎨 **Dark/Light Theme**: Comfortable viewing in any environment
- 🔍 **Real-time Search**: Quickly find relevant prompts
- 📂 **Category Organization**: Well-structured prompt categories
- 📋 **Copy-to-Clipboard**: Easy prompt reuse
- ⚡ **Fast Performance**: Optimized loading and rendering
- 🔒 **SEO Optimized**: Enhanced visibility and ranking

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prompts.git
cd prompts
```

2. Open `index.html` in your browser or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve
```

3. Visit `http://localhost:8000` in your browser

### GitHub Pages Deployment

1. Create a new repository on GitHub
2. Push your code:
```bash
git remote add origin https://github.com/yourusername/prompts.git
git branch -M main
git push -u origin main
```

3. Enable GitHub Pages:
- Go to repository Settings > Pages
- Source: Deploy from a branch
- Branch: main / (root)
- Save

### Cloudflare Setup

1. Add your site to Cloudflare:
- Login to Cloudflare Dashboard
- Add your domain
- Update nameservers at your domain registrar

2. Configure DNS:
- Type: CNAME
- Name: prompts (or your preferred subdomain)
- Target: yourusername.github.io
- Proxy status: Proxied

3. Enable SSL/TLS:
- SSL/TLS mode: Full
- Always Use HTTPS: On
- Auto Minify: HTML, CSS, JavaScript

## 🎯 Usage

1. **Search Prompts**:
   - Use the search bar to find specific prompts
   - Results update in real-time

2. **Category Navigation**:
   - Browse prompts by category
   - Click category tags to filter

3. **View Options**:
   - Toggle between grid and list views
   - Sort by popularity, recent, or alphabetical

4. **Copy Prompts**:
   - Click the copy button on any prompt
   - Paste directly into your AI tool

## 🔧 Customization

### Adding New Prompts

1. Navigate to `prompts/categories/all.json`
2. Add your prompt following the format:
```json
{
  "title": "Your Prompt Title",
  "category": "category-name",
  "content": "Your prompt content here"
}
```

### Creating New Categories

1. Update the category list in `index.html`
2. Add corresponding styles in `assets/css/styles.css`
3. Update prompt data with new category

## 📖 Documentation

For detailed technical specifications and documentation:
- [Technical Specification](TECHNICAL_SPEC.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by the AI development community
- Built with modern web technologies

## 📞 Support

- Create an issue for bug reports or feature requests
- Star the repository if you find it useful
- Fork it to contribute improvements

## 🔄 Updates

Stay updated with new prompts and features:
- Watch this repository
- Subscribe to our newsletter
- Follow us on social media

---

Made with ❤️ by the AI Prompts Collection Team