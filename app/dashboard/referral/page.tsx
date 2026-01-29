'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { useUser } from '@/contexts/user-context'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Gift,
  Users,
  Trophy,
  Copy,
  Check,
  Share2,
  Percent,
  Crown,
  Link as LinkIcon,
  RefreshCw,
} from 'lucide-react'

const translations = {
  ka: {
    referralProgram: 'რეფერალური პროგრამა',
    referralDescription:
      'მოიწვიეთ მეგობრები და მიიღეთ 10% ფასდაკლება ყველა შეძენაზე!',
    yourReferralLink: 'თქვენი რეფერალური ბმული',
    yourReferralCode: 'თქვენი რეფერალური კოდი',
    copyLink: 'ბმულის კოპირება',
    copyCode: 'კოდის კოპირება',
    copied: 'კოპირებულია!',
    share: 'გაზიარება',
    statistics: 'სტატისტიკა',
    invitedUsers: 'მოწვეული მომხმარებლები',
    successfulReferrals: 'წარმატებული რეფერალები',
    activeReward: 'აქტიური ჯილდო',
    discountActive: 'ფასდაკლება აქტიურია',
    discountInactive: 'ფასდაკლება არააქტიურია',
    howItWorks: 'როგორ მუშაობს',
    step1Title: 'გააზიარეთ ბმული',
    step1Desc: 'გაუზიარეთ თქვენი უნიკალური რეფერალური ბმული მეგობრებს',
    step2Title: 'მეგობარი რეგისტრირდება',
    step2Desc: 'როდესაც მეგობარი დარეგისტრირდება თქვენი ბმულით',
    step3Title: 'მიიღეთ ფასდაკლება',
    step3Desc: 'მიიღეთ 10% ფასდაკლება ყველა შეძენაზე',
    generateNewCode: 'ახალი კოდის გენერირება',
  },
  en: {
    referralProgram: 'Referral Program',
    referralDescription:
      'Invite friends and get 10% discount on all purchases!',
    yourReferralLink: 'Your Referral Link',
    yourReferralCode: 'Your Referral Code',
    copyLink: 'Copy Link',
    copyCode: 'Copy Code',
    copied: 'Copied!',
    share: 'Share',
    statistics: 'Statistics',
    invitedUsers: 'Invited Users',
    successfulReferrals: 'Successful Referrals',
    activeReward: 'Active Reward',
    discountActive: 'Discount Active',
    discountInactive: 'Discount Inactive',
    howItWorks: 'How It Works',
    step1Title: 'Share Your Link',
    step1Desc: 'Share your unique referral link with friends',
    step2Title: 'Friend Signs Up',
    step2Desc: 'When a friend registers using your link',
    step3Title: 'Get Discount',
    step3Desc: 'Receive 10% discount on all purchases',
    generateNewCode: 'Generate New Code',
  },
  ru: {
    referralProgram: 'Реферальная программа',
    referralDescription:
      'Приглашайте друзей и получайте скидку 10% на все покупки!',
    yourReferralLink: 'Ваша реферальная ссылка',
    yourReferralCode: 'Ваш реферальный код',
    copyLink: 'Копировать ссылку',
    copyCode: 'Копировать код',
    copied: 'Скопировано!',
    share: 'Поделиться',
    statistics: 'Статистика',
    invitedUsers: 'Приглашенные пользователи',
    successfulReferrals: 'Успешные рефералы',
    activeReward: 'Активная награда',
    discountActive: 'Скидка активна',
    discountInactive: 'Скидка неактивна',
    howItWorks: 'Как это работает',
    step1Title: 'Поделитесь ссылкой',
    step1Desc: 'Поделитесь вашей уникальной реферальной ссылкой с друзьями',
    step2Title: 'Друг регистрируется',
    step2Desc: 'Когда друг регистрируется по вашей ссылке',
    step3Title: 'Получите скидку',
    step3Desc: 'Получите скидку 10% на все покупки',
    generateNewCode: 'Сгенерировать новый код',
  },
}

export default function ReferralPage() {
  const { language } = useLanguage()
  const { referralData, generateReferralCode } = useUser()
  const t = translations[language]

  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  const copyToClipboard = (text: string, type: 'link' | 'code') => {
    navigator.clipboard.writeText(text)
    if (type === 'link') {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    } else {
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  const shareReferral = () => {
    if (navigator.share && referralData) {
      navigator.share({
        title: 'GameVault Referral',
        text: t.referralDescription,
        url: referralData.referralLink,
      })
    }
  }

  const stats = [
    {
      icon: Users,
      label: t.invitedUsers,
      value: referralData?.invitedUsers || 0,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Trophy,
      label: t.successfulReferrals,
      value: referralData?.successfulReferrals || 0,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Percent,
      label: t.activeReward,
      value: referralData?.hasActiveDiscount
        ? `-${referralData.discountPercentage}%`
        : '-',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
  ]

  const steps = [
    { icon: Share2, title: t.step1Title, desc: t.step1Desc },
    { icon: Users, title: t.step2Title, desc: t.step2Desc },
    { icon: Gift, title: t.step3Title, desc: t.step3Desc },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t.referralProgram}</h1>
        {referralData?.hasActiveDiscount && (
          <Badge className="bg-accent/20 text-accent border-accent/30 border">
            <Crown className="h-3 w-3 mr-1" />
            {t.discountActive}
          </Badge>
        )}
      </div>

      {/* Hero Card */}
      <Card className="glass-card border-glass-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <CardContent className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
              <Gift className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                {t.referralDescription}
              </h2>
              <p className="text-muted-foreground">
                {language === 'ka'
                  ? 'გააზიარეთ თქვენი უნიკალური კოდი და დაიწყეთ დაზოგვა დღესვე'
                  : language === 'ru'
                    ? 'Поделитесь своим уникальным кодом и начните экономить сегодня'
                    : 'Share your unique code and start saving today'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card border-glass-border hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Referral Link & Code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Referral Link */}
        <Card className="glass-card border-glass-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <LinkIcon className="h-5 w-5 text-primary" />
              {t.yourReferralLink}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                readOnly
                value={referralData?.referralLink || ''}
                className="bg-input border-border font-mono text-sm"
              />
              <Button
                variant="outline"
                className="shrink-0 bg-transparent border-border hover:border-primary hover:text-primary"
                onClick={() =>
                  referralData && copyToClipboard(referralData.referralLink, 'link')
                }
              >
                {copiedLink ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() =>
                  referralData && copyToClipboard(referralData.referralLink, 'link')
                }
              >
                <Copy className="h-4 w-4 mr-2" />
                {copiedLink ? t.copied : t.copyLink}
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-border hover:border-accent hover:text-accent"
                onClick={shareReferral}
              >
                <Share2 className="h-4 w-4 mr-2" />
                {t.share}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Referral Code */}
        <Card className="glass-card border-glass-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <Gift className="h-5 w-5 text-accent" />
              {t.yourReferralCode}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 p-3 rounded-lg bg-accent/10 border border-accent/30 text-center">
                <span className="text-2xl font-bold font-mono text-accent tracking-wider">
                  {referralData?.referralCode || '------'}
                </span>
              </div>
              <Button
                variant="outline"
                className="shrink-0 bg-transparent border-border hover:border-accent hover:text-accent"
                onClick={() =>
                  referralData && copyToClipboard(referralData.referralCode, 'code')
                }
              >
                {copiedCode ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() =>
                  referralData && copyToClipboard(referralData.referralCode, 'code')
                }
              >
                <Copy className="h-4 w-4 mr-2" />
                {copiedCode ? t.copied : t.copyCode}
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-border hover:border-primary hover:text-primary"
                onClick={generateReferralCode}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {t.generateNewCode}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle className="text-foreground">{t.howItWorks}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
