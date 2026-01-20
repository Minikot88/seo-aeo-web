import '@/styles/contact.css'

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-card">
        <h1>📞 ติดต่อเรา</h1>

        <p className="contact-desc">
          หากคุณมีคำถามเกี่ยวกับสินค้า การสั่งซื้อ หรือการร่วมเป็นพาร์ตเนอร์
          สามารถติดต่อเราได้ตามช่องทางด้านล่าง
        </p>

        <div className="contact-list">
          <div className="contact-item">
            <span className="label">อีเมล</span>
            <a href="mailto:contact@affshop.com">
              contact@affshop.com
            </a>
          </div>

          <div className="contact-item">
            <span className="label">LINE</span>
            <a
              href="https://line.me/ti/p/@yourlineid"
              target="_blank"
              rel="noopener noreferrer"
            >
              @yourlineid
            </a>
          </div>

          <div className="contact-item">
            <span className="label">Facebook</span>
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
            >
              AFF SHOP
            </a>
          </div>

          
        </div>
      </section>
    </main>
  )
}
