import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

const sponsors = [
  {
    name: 'Manmukh & Sons',
    // tier: 'Gold',
    image: 'images/Sponsor.jpeg.png1.png',
    description: 'Proud supporter of Modi Park Cha Raja Ganeshotsav 2026.',
  },
  {
    name: 'Laxmi Industries',
    // tier: 'Gold',
    image: 'images/ganpati-2.jpg.jpeg',
    description: 'Committed to serving the community through tradition.',
  },
  {
    name: 'Patil Construction Co.',
    // tier: 'Silver',
    image: 'images/ganpati-3.jpg.jpeg',
    description: 'Building stronger communities, one celebration at a time.',
  },
  {
    name: 'Sai Electronics',
    // tier: 'Silver',
    image: 'images/ganpati-4.jpg.jpeg',
    description: 'Powering festivities with trust and technology.',
  },
  {
    name: 'Agarwal Sweets & Namkeen',
    // tier: 'Bronze',
    image: 'images/ganpati-5.jpg.jpeg',
    description: 'Sweetening every moment of Ganeshotsav.',
  },
  {
    name: 'Vardhman Textiles',
    // tier: 'Bronze',
    image: 'images/ganpati-6.jpg.jpeg',
    description: 'Draped in tradition, woven with devotion.',
  },
  {
    name: 'Vardhman Textiles 2',
    // tier: 'Bronze',
    image: 'images/ganpati-6.jpg.jpeg',
    description: 'Draped in tradition, woven with devotion.',
  },
]

const tierColors = {
  Gold: { bg: 'linear-gradient(135deg, #e8bd8a, #f4d9a8)', text: '#1f1b4d' },
  Silver: { bg: 'linear-gradient(135deg, #c0c0c0, #e0e0e0)', text: '#1f1b4d' },
  Bronze: { bg: 'linear-gradient(135deg, #cd7f32, #e8a862)', text: '#fff' },
}

export default function Sponsors() {
  return (
    <section className="section sponsor-section">
      <div className="section-heading">
        <span className="section-label">OUR SUPPORTERS</span>
        <h2>
          Sponsors Who
          <span>Make It Happen</span>
        </h2>
        <p>We are grateful to our sponsors for their generous support of Ganeshotsav 2026.</p>
      </div>

      <div className="sponsor-grid">
        {sponsors.map((sponsor) => (
          <Card
            key={sponsor.name}
            className="sponsor-card"
            sx={{
              borderRadius: '22px',
              border: '1px solid var(--border)',
              background: 'var(--white)',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 20px 60px rgba(16,21,47,.12)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={sponsor.image}
              alt={sponsor.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ padding: '20px 25px 25px' }}>

              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  marginTop: '10px',
                  color: 'var(--text)',
                }}
              >
                {sponsor.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--muted)',
                  marginTop: '6px',
                  lineHeight: 1.6,
                  fontSize: '14px',
                }}
              >
                {sponsor.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
