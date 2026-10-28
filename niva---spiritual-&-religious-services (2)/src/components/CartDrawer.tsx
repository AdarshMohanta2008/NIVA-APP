import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, Tag, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { CartItem, OrderItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckoutSuccess: (order: OrderItem) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const finalTotal = Math.max(0, subtotal - discount + shippingFee);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'NIVA10' || couponCode.trim().toUpperCase() === 'BLESSED') {
      const disc = Math.round(subtotal * 0.1 * 100) / 100;
      setDiscount(disc);
      setCouponMessage('10% Sacred Blessing discount applied!');
    } else {
      setCouponMessage('Invalid code. Try "NIVA10"');
    }
  };

  const handleCheckout = () => {
    const generatedOrderNum = `#NV-ORD-${Math.floor(2000 + Math.random() * 8000)}`;
    setOrderRef(generatedOrderNum);
    const newOrder: OrderItem = {
      id: generatedOrderNum,
      orderNumber: generatedOrderNum,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Processing',
      total: Number(finalTotal.toFixed(2)),
      items: cartItems.map((ci) => ({
        productName: ci.product.name,
        quantity: ci.quantity,
        price: ci.product.price,
        image: ci.product.image,
      })),
    };
    onCheckoutSuccess(newOrder);
    setIsOrdered(true);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Blurred Cosmic Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#07030F]/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* visionOS Glass Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative max-w-md w-full bg-[#0D071E]/90 backdrop-blur-3xl shadow-[0_0_60px_rgba(168,85,247,0.25)] flex flex-col z-10 border-l border-white/15 h-full text-white"
      >
        {/* Header */}
        <div className="p-4 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Sacred Cart ({cartItems.reduce((n, i) => n + i.quantity, 0)})
              </h3>
              <p className="text-[10px] text-white/50">Blessed items ready for sanctification</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsOrdered(false);
              onClose();
            }}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isOrdered ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-extrabold text-white">Order Placed Successfully!</h4>
              <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed">
                Order <strong className="text-amber-300 font-mono">{orderRef}</strong> has been received into our sanctuary registry. Your consecrated essentials are being prepared.
              </p>
              <button
                onClick={() => {
                  setIsOrdered(false);
                  onClose();
                }}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-amber-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer border border-white/20"
              >
                Continue Exploring NIVA
              </button>
            </motion.div>
          ) : cartItems.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 bg-white/[0.04] border border-white/10 rounded-2xl flex items-center justify-center mx-auto text-white/40">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-white font-bold text-sm">Your sacred cart is empty</h4>
              <p className="text-xs text-white/50 max-w-xs mx-auto">
                Explore ceremony kits, organic hawan samagri, brass diyas and consecrated prayer beads.
              </p>
            </div>
          ) : (
            <>
              {/* Item Cards */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    className="flex items-center gap-3 p-3 glass-card rounded-2xl border border-white/10 shadow-lg"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-amber-300 font-bold mt-0.5">
                        ${item.product.price}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-white/15 rounded-lg bg-white/[0.06]">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-white/10 text-white/70 hover:text-white rounded-l-lg cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-2.5 text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-white/10 text-white/70 hover:text-white rounded-r-lg cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 text-white/40 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Promo code */}
              <div className="glass-panel p-3.5 rounded-2xl border border-white/10 space-y-2">
                <label className="text-[11px] font-bold text-white/80 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  Have a Promo Code? (Try: NIVA10)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-1.5 text-xs bg-white/[0.06] border border-white/15 rounded-xl outline-none uppercase font-semibold text-white placeholder-white/40 focus:border-purple-400"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-3.5 py-1.5 text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold rounded-xl transition-all border border-white/20 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className="text-[11px] text-amber-300 font-medium">
                    {couponMessage}
                  </p>
                )}
              </div>

              {/* Order summary */}
              <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Sacred Promo (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/70">
                  <span>Standard Consecrated Delivery</span>
                  <span className="text-amber-300 font-semibold">{shippingFee === 0 ? 'FREE' : `$${shippingFee}`}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-black text-white">
                  <span>Grand Total:</span>
                  <span className="text-amber-300 text-base">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-white/50 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Pure, ethically sourced materials & safe cosmic dispatch
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {!isOrdered && cartItems.length > 0 && (
          <div className="p-4 bg-white/[0.04] border-t border-white/10 space-y-2.5">
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:brightness-110 active:scale-98 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all border border-white/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Confirm Sacred Order • ${finalTotal.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClearCart}
              className="w-full text-center text-[11px] text-white/50 hover:text-white/80 transition-colors cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
