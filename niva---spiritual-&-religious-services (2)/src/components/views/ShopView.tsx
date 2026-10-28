import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ShoppingBag,
  Star,
  Heart,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  X,
} from 'lucide-react';
import { Product, Religion } from '../../types';
import { PRODUCTS, RELIGIONS } from '../../data/mockData';
import { TiltCard } from '../spatial/TiltCard';
import { useEffectsSettings } from '../../context/EffectsContext';

interface ShopViewProps {
  onAddToCart: (product: Product) => void;
  onOpenCart: () => void;
  cartCount: number;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onAddToCart,
  onOpenCart,
  cartCount,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedReligion, setSelectedReligion] = useState<Religion | 'All'>('All');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { effectsLevel } = useEffectsSettings();

  const categories = [
    'All',
    'Ceremony Kits',
    'Sacred Idols & Crosses',
    'Holy Books',
    'Incense & Fragrance',
    'Spiritual Gifts',
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesReligion = selectedReligion === 'All' || p.religion === selectedReligion;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesReligion && matchesSearch;
  });

  const handleAddWithFeedback = (product: Product) => {
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

  return (
    <div className="space-y-5 px-2 sm:px-4 pt-2 pb-28 text-white">
      {/* Header Bar */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full glass-pill text-amber-300 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight gradient-text-sacred leading-tight">
                Sacred Essentials & Kits
              </h1>
              <p className="text-xs text-white/60">
                100% Pure & Consecrated items for ritual sanctification
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCart}
            className="relative px-3.5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="w-4 h-4 bg-amber-400 text-[#07030F] rounded-full text-[10px] font-black flex items-center justify-center shadow-[0_0_8px_#F59E0B]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Input in Frosted Glass */}
      <div className="relative">
        <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search samagri kits, brass lamps, holy books, incense..."
          className="w-full pl-10 pr-9 py-2.5 bg-white/[0.08] border border-white/20 rounded-2xl text-xs font-normal text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:bg-white/[0.12] transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-2.5 text-xs text-white/50 hover:text-white font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-purple-600 to-amber-600 text-white shadow-md border border-white/30'
                : 'glass-pill text-white/70 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Religion Filter Mini-Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[11px]">
        <span className="text-white/40 font-bold shrink-0">Tradition:</span>
        <button
          onClick={() => setSelectedReligion('All')}
          className={`px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer ${
            selectedReligion === 'All'
              ? 'bg-white/25 text-white font-bold border border-white/40'
              : 'glass-pill text-white/60 hover:text-white'
          }`}
        >
          All
        </button>
        {RELIGIONS.map((rel) => (
          <button
            key={rel.id}
            onClick={() => setSelectedReligion(rel.id)}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              selectedReligion === rel.id
                ? 'bg-white/25 text-white font-bold border border-white/40'
                : 'glass-pill text-white/60 hover:text-white'
            }`}
          >
            <span>{rel.symbol}</span>
            <span>{rel.name}</span>
          </button>
        ))}
      </div>

      {/* Trust Banner in Frosted Glass */}
      <div className="p-3 rounded-2xl glass-panel grid grid-cols-2 gap-2 text-[11px] text-white/80 border-white/15">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>100% Consecrated & Pure</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-purple-300 shrink-0" />
          <span>Careful Doorstep Delivery</span>
        </div>
      </div>

      {/* Products Grid with 3D Tilt */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          const isAdded = addedAnimationId === product.id;

          return (
            <TiltCard
              key={product.id}
              className="rounded-3xl glass-card overflow-hidden flex flex-col justify-between group border border-white/15"
            >
              {/* Product Thumbnail */}
              <div className="relative aspect-square overflow-hidden bg-black/20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Wishlist Button with Heart Burst */}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/70 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Save to Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : ''
                    } transition-transform`}
                  />
                </button>

                {/* Tradition Badge */}
                <span className="absolute bottom-2 left-2 glass-pill text-white text-[9px] font-bold px-2 py-0.5">
                  {product.religion}
                </span>

                {/* Quick View trigger */}
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute inset-x-2 bottom-2 py-1.5 rounded-xl bg-[#07030F]/90 text-white font-bold text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-md text-center border border-white/20 backdrop-blur-md cursor-pointer"
                >
                  Quick View
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3 flex flex-col justify-between flex-1 gap-2">
                <div>
                  <h3 className="font-bold text-xs text-white line-clamp-1 group-hover:text-amber-200 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] text-white/50 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span>({product.reviewsCount})</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-black text-amber-300">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-white/40 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    id={`add-cart-btn-${product.id}`}
                    onClick={() => handleAddWithFeedback(product)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-500 text-white shadow-[0_0_12px_#10B981]'
                        : 'bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white shadow-md active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <span>Add</span>
                    )}
                  </button>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Quick View Modal in VisionOS Glass */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07030F]/80 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel-elevated w-full max-w-sm rounded-[32px] overflow-hidden text-white border border-white/20 shadow-2xl relative"
            >
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-4/3 overflow-hidden bg-black/30">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full glass-pill text-amber-300">
                      {quickViewProduct.religion}
                    </span>
                    <span className="text-[10px] text-white/50">
                      {quickViewProduct.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {quickViewProduct.name}
                  </h3>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    {quickViewProduct.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="text-lg font-bold text-amber-300">
                    ${quickViewProduct.price}
                  </div>

                  <button
                    onClick={() => {
                      handleAddWithFeedback(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
