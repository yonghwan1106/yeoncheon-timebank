'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  Search,
  PenSquare,
  TrendingUp,
  Users,
  Clock,
  Filter,
  ThumbsUp,
  MessageSquare,
  Award,
  Sparkles,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

type PostCategory = 'all' | 'question' | 'share' | 'review' | 'notice';

interface Post {
  id: number;
  author: string;
  authorType: 'senior' | 'soldier' | 'citizen' | 'admin';
  avatar: string;
  category: PostCategory;
  title: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
}

const categories = [
  { id: 'all' as PostCategory, label: '전체', icon: Sparkles },
  { id: 'question' as PostCategory, label: '질문', icon: MessageCircle },
  { id: 'share' as PostCategory, label: '나눔', icon: Heart },
  { id: 'review' as PostCategory, label: '후기', icon: ThumbsUp },
  { id: 'notice' as PostCategory, label: '공지', icon: Award },
];

const mockPosts: Post[] = [
  {
    id: 1,
    author: '김영희',
    authorType: 'senior',
    avatar: '👵',
    category: 'review',
    title: '처음으로 타임뱅크 서비스를 이용해봤어요!',
    content: '젊은 분이 오셔서 핸드폰 사용법을 알려주셨는데, 정말 친절하게 가르쳐주셔서 감사했습니다. 이제 손자에게 영상통화도 할 수 있게 됐어요!',
    likes: 24,
    comments: 8,
    timeAgo: '2시간 전',
    isLiked: true,
    isBookmarked: false,
    tags: ['IT교육', '첫이용'],
  },
  {
    id: 2,
    author: '이민준',
    authorType: 'soldier',
    avatar: '🪖',
    category: 'share',
    title: '이번 주 토요일 봉사활동 같이 하실 분!',
    content: '연천 양로원에서 말벗 봉사활동 예정입니다. 관심 있으신 분들 댓글 남겨주세요. 함께하면 더 즐거울 것 같아요 😊',
    likes: 15,
    comments: 12,
    timeAgo: '4시간 전',
    isLiked: false,
    isBookmarked: true,
    tags: ['봉사모집', '말벗'],
  },
  {
    id: 3,
    author: '박지현',
    authorType: 'citizen',
    avatar: '👩',
    category: 'question',
    title: '크레딧 적립 방법이 궁금해요',
    content: '봉사활동 외에 크레딧을 적립할 수 있는 다른 방법이 있나요? 아이 돌봄이나 반려동물 돌봄도 가능한지 알고 싶습니다.',
    likes: 8,
    comments: 5,
    timeAgo: '6시간 전',
    isLiked: false,
    isBookmarked: false,
    tags: ['크레딧', '질문'],
  },
  {
    id: 4,
    author: '관리자',
    authorType: 'admin',
    avatar: '🏛️',
    category: 'notice',
    title: '[공지] 2026년 1월 타임뱅크 이벤트 안내',
    content: '새해를 맞아 특별 이벤트를 진행합니다! 1월 한 달간 봉사활동 시 추가 크레딧 50% 지급, 신규 가입자 웰컴 크레딧 100TC 증정!',
    likes: 45,
    comments: 23,
    timeAgo: '1일 전',
    isLiked: true,
    isBookmarked: true,
    tags: ['이벤트', '공지'],
  },
  {
    id: 5,
    author: '최서준',
    authorType: 'soldier',
    avatar: '🪖',
    category: 'review',
    title: '어르신 댁 청소 봉사 다녀왔습니다',
    content: '혼자 사시는 어르신 댁 청소를 도와드렸어요. 처음엔 어색했는데 이야기 나누다 보니 시간이 훌쩍 지나갔네요. 다음에도 또 가겠습니다!',
    likes: 32,
    comments: 7,
    timeAgo: '1일 전',
    isLiked: false,
    isBookmarked: false,
    tags: ['청소봉사', '후기'],
  },
];

const activeUsers = [
  { name: '김영희', avatar: '👵', activity: '방금 활동' },
  { name: '이민준', avatar: '🪖', activity: '5분 전' },
  { name: '박지현', avatar: '👩', activity: '10분 전' },
  { name: '정수민', avatar: '👴', activity: '30분 전' },
];

const popularTags = ['봉사후기', 'IT교육', '말벗', '크레딧', '이벤트', '신규가입', '질문'];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<PostCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(mockPosts);

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) {
      return false;
    }
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const toggleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleBookmark = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    );
  };

  const getAuthorBadge = (type: string) => {
    switch (type) {
      case 'senior':
        return (
          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
            어르신
          </span>
        );
      case 'soldier':
        return (
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
            장병
          </span>
        );
      case 'admin':
        return (
          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
            관리자
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
            주민
          </span>
        );
    }
  };

  const getCategoryColor = (category: PostCategory) => {
    switch (category) {
      case 'question':
        return 'bg-blue-100 text-blue-700';
      case 'share':
        return 'bg-pink-100 text-pink-700';
      case 'review':
        return 'bg-green-100 text-green-700';
      case 'notice':
        return 'bg-primary/20 text-primary';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: PostCategory) => {
    const cat = categories.find((c) => c.id === category);
    return cat?.label || '기타';
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">커뮤니티</h1>
          <p className="text-gray-600 mt-1">연천 주민들과 소통하고 정보를 나눠보세요</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/25"
        >
          <PenSquare className="h-5 w-5" />
          글쓰기
        </motion.button>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="게시글 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
          <Filter className="h-5 w-5" />
          필터
        </button>
      </div>

      {/* 카테고리 탭 */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;

          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {category.label}
            </motion.button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 게시글 목록 */}
        <div className="lg:col-span-2 space-y-4">
          {filteredPosts.length === 0 ? (
            <GlassCard className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">게시글이 없습니다</p>
            </GlassCard>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-5 hover:shadow-lg transition-shadow cursor-pointer">
                  {/* 게시글 헤더 */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                        {post.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{post.author}</span>
                          {getAuthorBadge(post.authorType)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-3.5 w-3.5" />
                          {post.timeAgo}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getCategoryColor(
                        post.category
                      )}`}
                    >
                      {getCategoryLabel(post.category)}
                    </span>
                  </div>

                  {/* 게시글 내용 */}
                  <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{post.content}</p>

                  {/* 태그 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 text-sm ${
                          post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        } transition-colors`}
                      >
                        <Heart
                          className={`h-4.5 w-4.5 ${post.isLiked ? 'fill-current' : ''}`}
                        />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
                        <MessageCircle className="h-4.5 w-4.5" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
                        <Share2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className={`${
                        post.isBookmarked
                          ? 'text-amber-500'
                          : 'text-gray-400 hover:text-amber-500'
                      } transition-colors`}
                    >
                      <Bookmark
                        className={`h-5 w-5 ${post.isBookmarked ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          )}
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 활동 중인 사용자 */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-gray-900">활동 중인 이웃</h3>
            </div>
            <div className="space-y-3">
              {activeUsers.map((user, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                      {user.avatar}
                    </div>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* 인기 태그 */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-gray-900">인기 태그</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-primary/10 hover:text-primary text-gray-600 text-sm rounded-lg transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* 커뮤니티 통계 */}
          <GlassCard className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4">커뮤니티 현황</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/5 rounded-xl">
                <p className="text-2xl font-bold text-primary">1,234</p>
                <p className="text-xs text-gray-600">총 회원</p>
              </div>
              <div className="text-center p-3 bg-secondary/5 rounded-xl">
                <p className="text-2xl font-bold text-secondary">567</p>
                <p className="text-xs text-gray-600">게시글</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-xl">
                <p className="text-2xl font-bold text-amber-600">89</p>
                <p className="text-xs text-gray-600">오늘 활동</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <p className="text-2xl font-bold text-green-600">156</p>
                <p className="text-xs text-gray-600">이번 주 가입</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
