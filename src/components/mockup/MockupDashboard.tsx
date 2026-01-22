'use client';

interface MockupDashboardProps {
  variant?: 'mobile' | 'tablet' | 'desktop';
}

export function MockupDashboard({ variant = 'mobile' }: MockupDashboardProps) {
  const isMobile = variant === 'mobile';
  const isTablet = variant === 'tablet';

  return (
    <div className="mockup-dashboard" data-variant={variant}>
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="brand">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">연천 타임뱅크</span>
          </div>
          {!isMobile && (
            <nav className="nav-links">
              <span className="nav-item active">대시보드</span>
              <span className="nav-item">봉사하기</span>
              <span className="nav-item">내 지갑</span>
              <span className="nav-item">프로그램</span>
            </nav>
          )}
          <div className="user-avatar">
            <span>김</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-card">
          <div className="hero-greeting">
            <span className="wave-emoji">👋</span>
            <div className="greeting-text">
              <p className="greeting-small">안녕하세요,</p>
              <p className="greeting-name">김연천님!</p>
            </div>
          </div>
          <div className="level-badge">
            <span className="level-icon">🏆</span>
            <span className="level-text">Lv.12 실버 히어로</span>
          </div>
          <div className="progress-section">
            <div className="progress-labels">
              <span>경험치</span>
              <span>2,450 / 3,000 XP</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '82%' }} />
            </div>
          </div>
          <div className="today-stats">
            <div className="stat-item">
              <span className="stat-value">2.5h</span>
              <span className="stat-label">오늘 봉사</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value fire">7</span>
              <span className="stat-label">연속 일수</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card gold">
            <div className="stat-card-icon">🪙</div>
            <div className="stat-card-content">
              <p className="stat-card-value">1,245</p>
              <p className="stat-card-label">총 타임크레딧</p>
            </div>
          </div>
          <div className="stat-card blue">
            <div className="stat-card-icon">⏱️</div>
            <div className="stat-card-content">
              <p className="stat-card-value">156h</p>
              <p className="stat-card-label">총 봉사시간</p>
            </div>
          </div>
          <div className="stat-card green">
            <div className="stat-card-icon">👥</div>
            <div className="stat-card-content">
              <p className="stat-card-value">1,234</p>
              <p className="stat-card-label">참여 인원</p>
            </div>
          </div>
          <div className="stat-card pink">
            <div className="stat-card-icon">💝</div>
            <div className="stat-card-content">
              <p className="stat-card-value">89</p>
              <p className="stat-card-label">완료 매칭</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      {isMobile && (
        <section className="quick-actions">
          <div className="action-card primary">
            <span className="action-icon">🤝</span>
            <span className="action-text">봉사 신청</span>
          </div>
          <div className="action-card">
            <span className="action-icon">💳</span>
            <span className="action-text">지갑</span>
          </div>
          <div className="action-card">
            <span className="action-icon">📚</span>
            <span className="action-text">프로그램</span>
          </div>
          <div className="action-card">
            <span className="action-icon">🏪</span>
            <span className="action-text">가맹점</span>
          </div>
        </section>
      )}

      {/* Services/Activity Section */}
      <section className="services-section">
        <h3 className="section-title">
          <span>🎯</span> 추천 봉사활동
        </h3>
        <div className="services-list">
          <div className="service-item">
            <div className="service-emoji">🧓</div>
            <div className="service-info">
              <p className="service-name">독거어르신 말벗봉사</p>
              <p className="service-meta">📍 삼화리 · +15 크레딧</p>
            </div>
            <div className="service-badge urgent">급구</div>
          </div>
          <div className="service-item">
            <div className="service-emoji">🚗</div>
            <div className="service-info">
              <p className="service-name">병원 이동 지원</p>
              <p className="service-meta">📍 전곡읍 · +20 크레딧</p>
            </div>
            <div className="service-badge new">New</div>
          </div>
          <div className="service-item">
            <div className="service-emoji">📱</div>
            <div className="service-info">
              <p className="service-name">스마트폰 교육</p>
              <p className="service-meta">📍 연천읍 · +10 크레딧</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Nav (Mobile) */}
      {isMobile && (
        <nav className="bottom-nav">
          <div className="nav-item active">
            <span className="nav-icon">🏠</span>
            <span className="nav-label">홈</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">🤝</span>
            <span className="nav-label">봉사</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">💰</span>
            <span className="nav-label">지갑</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">👤</span>
            <span className="nav-label">마이</span>
          </div>
        </nav>
      )}

      <style jsx>{`
        .mockup-dashboard {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(
            180deg,
            oklch(0.95 0.04 145) 0%,
            oklch(0.985 0.002 106.424) 30%
          );
          min-height: 100%;
          display: flex;
          flex-direction: column;
          font-size: ${isMobile ? '14px' : '16px'};
        }

        /* Header */
        .dashboard-header {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: ${isMobile ? '12px 16px' : '12px 24px'};
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-icon {
          font-size: ${isMobile ? '24px' : '28px'};
        }

        .logo-text {
          font-weight: 700;
          font-size: ${isMobile ? '16px' : '20px'};
          background: linear-gradient(135deg, oklch(0.55 0.15 145), oklch(0.65 0.12 240));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-links {
          display: flex;
          gap: 24px;
        }

        .nav-links .nav-item {
          font-size: 14px;
          color: #666;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .nav-links .nav-item.active {
          color: oklch(0.55 0.15 145);
          background: oklch(0.95 0.04 145);
          font-weight: 600;
        }

        .user-avatar {
          width: ${isMobile ? '32px' : '40px'};
          height: ${isMobile ? '32px' : '40px'};
          border-radius: 50%;
          background: linear-gradient(135deg, oklch(0.55 0.15 145), oklch(0.65 0.12 240));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: ${isMobile ? '14px' : '16px'};
        }

        /* Hero Section */
        .hero-section {
          padding: ${isMobile ? '16px' : '24px'};
        }

        .hero-card {
          background: linear-gradient(135deg, oklch(0.55 0.15 145), oklch(0.5 0.13 160));
          border-radius: 20px;
          padding: ${isMobile ? '20px' : '28px'};
          color: white;
          box-shadow: 0 10px 40px -10px oklch(0.55 0.15 145 / 0.5);
        }

        .hero-greeting {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .wave-emoji {
          font-size: ${isMobile ? '32px' : '40px'};
          animation: wave 2s infinite;
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }

        .greeting-text {
          display: flex;
          flex-direction: column;
        }

        .greeting-small {
          font-size: ${isMobile ? '14px' : '16px'};
          opacity: 0.9;
        }

        .greeting-name {
          font-size: ${isMobile ? '20px' : '26px'};
          font-weight: 700;
        }

        .level-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.2);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: ${isMobile ? '12px' : '14px'};
          font-weight: 600;
          margin-bottom: 16px;
        }

        .progress-section {
          margin-bottom: 16px;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: ${isMobile ? '12px' : '13px'};
          opacity: 0.9;
          margin-bottom: 6px;
        }

        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #fff, oklch(0.9 0.1 85));
          border-radius: 4px;
        }

        .today-stats {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-value {
          font-size: ${isMobile ? '20px' : '24px'};
          font-weight: 700;
        }

        .stat-value.fire::after {
          content: '🔥';
          margin-left: 4px;
        }

        .stat-label {
          font-size: ${isMobile ? '11px' : '12px'};
          opacity: 0.8;
        }

        .stat-divider {
          width: 1px;
          height: 30px;
          background: rgba(255, 255, 255, 0.3);
        }

        /* Stats Section */
        .stats-section {
          padding: 0 ${isMobile ? '16px' : '24px'} ${isMobile ? '16px' : '24px'};
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(${isMobile ? 2 : 4}, 1fr);
          gap: ${isMobile ? '12px' : '16px'};
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: ${isMobile ? '14px' : '20px'};
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .stat-card-icon {
          font-size: ${isMobile ? '24px' : '28px'};
        }

        .stat-card-value {
          font-size: ${isMobile ? '20px' : '24px'};
          font-weight: 700;
          color: #1a1a1a;
        }

        .stat-card-label {
          font-size: ${isMobile ? '11px' : '13px'};
          color: #666;
        }

        .stat-card.gold { border-left: 3px solid oklch(0.8 0.16 85); }
        .stat-card.blue { border-left: 3px solid oklch(0.65 0.12 240); }
        .stat-card.green { border-left: 3px solid oklch(0.55 0.15 145); }
        .stat-card.pink { border-left: 3px solid oklch(0.7 0.15 350); }

        /* Quick Actions */
        .quick-actions {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          padding: 0 16px 16px;
        }

        .action-card {
          background: white;
          border-radius: 12px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .action-card.primary {
          background: linear-gradient(135deg, oklch(0.55 0.15 145), oklch(0.5 0.13 160));
          color: white;
        }

        .action-icon {
          font-size: 20px;
        }

        .action-text {
          font-size: 11px;
          font-weight: 500;
        }

        /* Services Section */
        .services-section {
          padding: 0 ${isMobile ? '16px' : '24px'} ${isMobile ? '80px' : '24px'};
        }

        .section-title {
          font-size: ${isMobile ? '16px' : '18px'};
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .services-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .service-item {
          background: white;
          border-radius: 14px;
          padding: ${isMobile ? '14px' : '18px'};
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .service-emoji {
          font-size: ${isMobile ? '28px' : '32px'};
          background: oklch(0.97 0.02 145);
          border-radius: 12px;
          width: ${isMobile ? '48px' : '56px'};
          height: ${isMobile ? '48px' : '56px'};
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-info {
          flex: 1;
        }

        .service-name {
          font-weight: 600;
          font-size: ${isMobile ? '14px' : '16px'};
          color: #1a1a1a;
        }

        .service-meta {
          font-size: ${isMobile ? '12px' : '13px'};
          color: #666;
          margin-top: 2px;
        }

        .service-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .service-badge.urgent {
          background: oklch(0.9 0.15 30);
          color: oklch(0.5 0.2 30);
        }

        .service-badge.new {
          background: oklch(0.9 0.1 240);
          color: oklch(0.5 0.15 240);
        }

        /* Bottom Nav */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          display: flex;
          justify-content: space-around;
          padding: 8px 0 calc(8px + env(safe-area-inset-bottom, 0));
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
        }

        .bottom-nav .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 4px 16px;
          color: #999;
        }

        .bottom-nav .nav-item.active {
          color: oklch(0.55 0.15 145);
        }

        .bottom-nav .nav-icon {
          font-size: 20px;
        }

        .bottom-nav .nav-label {
          font-size: 10px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

export default MockupDashboard;
