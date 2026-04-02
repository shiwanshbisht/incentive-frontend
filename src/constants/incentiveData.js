import { TrendingUp, Percent, Trophy } from 'lucide-react';

export const structureTabData = {
  Monthly: [
    {
      title: "Overall Achievement (Monthly)",
      icon: TrendingUp,
      badges: [{ label: "₹ Value" }, { label: "%Achievement" }],
      formula: "Achievement% = (CM ÷ Target) × 100",
      table: [
        { slab: "Silver", range: "100% ≤ x < 105%", earning: "₹3,500" },
        { slab: "Gold", range: "105% ≤ x < 110%", earning: "₹4,000" },
        { slab: "Platinum", range: "110% ≤ x < 115%", earning: "₹4,500" },
        { slab: "Diamond", range: "115% ≤ x < 120%", earning: "₹5,500" },
        { slab: "Ruby", range: "x ≥ 120%", earning: "₹6,500" },
      ]
    },
    {
      title: "PPP Achievement (Monthly)",
      icon: TrendingUp,
      badges: [{ label: "₹ Value" }, { label: "%Achievement" }],
      formula: "Achievement% = (CM ÷ Target) × 100",
      table: [
        { slab: "Silver", range: "100% ≤ x < 105%", earning: "₹2,000" },
        { slab: "Gold", range: "105% ≤ x < 110%", earning: "₹3,000" },
        { slab: "Platinum", range: "x ≥ 110%", earning: "₹4,000" },
      ]
    },
    {
      title: "PPP Volume Growth (Monthly)",
      icon: Percent,
      badges: [{ label: "Units" }, { label: "%Growth" }],
      formula: "Growth% = ((CM - LY) ÷ LY) × 100",
      table: [
        { slab: "Silver", range: "5% ≤ x < 10%", earning: "₹2,000" },
        { slab: "Gold", range: "10% ≤ x < 15%", earning: "₹3,000" },
        { slab: "Platinum", range: "x ≥ 15%", earning: "₹4,000" },
      ]
    },
    {
      title: "NI Achievement (Monthly)",
      icon: TrendingUp,
      badges: [{ label: "₹ Value" }, { label: "%Achievement" }],
      formula: "Achievement% = (CM ÷ Target) × 100",
      table: [
        { slab: "Silver", range: "100% ≤ x < 105%", earning: "₹2,000" },
        { slab: "Gold", range: "105% ≤ x < 110%", earning: "₹3,000" },
        { slab: "Platinum", range: "x ≥ 110%", earning: "₹4,000" },
      ]
    },
    {
      title: "Second Flash (15th day)",
      icon: TrendingUp,
      badges: [{ label: "₹ Value" }, { label: "%Achievement" }],
      formula: "Fortnight Achievement% = (C-Fortnight ÷ Target) × 100",
      table: [
        { slab: "Silver", range: "50% ≤ x < 55%", earning: "₹2,500" },
        { slab: "Gold", range: "55% ≤ x < 60%", earning: "₹3,000" },
        { slab: "Platinum", range: "x ≥ 60%", earning: "₹3,500" },
      ]
    }
  ],
  Quarterly: [
    {
      title: "Overall Achievement (Quarterly)",
      icon: TrendingUp,
      badges: [{ label: "₹ Value" }, { label: "%Achievement" }],
      formula: "Achievement% = (CQ ÷ Target) × 100",
      table: [
        { slab: "Silver", range: "100% ≤ x < 105%", earning: "₹7,500" },
        { slab: "Gold", range: "105% ≤ x < 110%", earning: "₹8,500" },
        { slab: "Platinum", range: "110% ≤ x < 115%", earning: "₹9,500" },
        { slab: "Diamond", range: "115% ≤ x < 120%", earning: "₹11,500" },
        { slab: "Ruby", range: "x ≥ 120%", earning: "₹13,500" }
      ]
    },
    {
      title: "PPP Achievement (Quarterly)",
      icon: TrendingUp,
      badges: [{ label: "₹ Value" }, { label: "%Achievement" }],
      formula: "Achievement% = (CQ ÷ Target) × 100",
      table: [
        { slab: "Silver", range: "100% ≤ x < 105%", earning: "₹4,000" },
        { slab: "Gold", range: "105% ≤ x < 110%", earning: "₹5,000" },
        { slab: "Platinum", range: "x ≥ 110%", earning: "₹6,000" }
      ]
    },
    {
      title: "PPP Volume Growth (Quarterly)",
      icon: Percent,
      badges: [{ label: "Units" }, { label: "%Growth" }],
      formula: "Growth% = ((CQ - LYQ) ÷ LYQ) × 100",
      table: [
        { slab: "Silver", range: "5% ≤ x < 10%", earning: "₹4,000" },
        { slab: "Gold", range: "10% ≤ x < 15%", earning: "₹5,000" },
        { slab: "Platinum", range: "x ≥ 15%", earning: "₹6,000" }
      ]
    },
    {
      title: "NI Achievement (Quarterly)",
      icon: TrendingUp,
      badges: [{ label: "₹ Value" }, { label: "%Achievement" }],
      formula: "Achievement% = (CQ ÷ Target) × 100",
      table: [
        { slab: "Silver", range: "100% ≤ x < 105%", earning: "₹4,000" },
        { slab: "Gold", range: "105% ≤ x < 110%", earning: "₹5,000" },
        { slab: "Platinum", range: "x ≥ 110%", earning: "₹6,000" }
      ]
    },
    {
      title: "Incremental YPM (Quarterly)",
      icon: TrendingUp,
      badges: [{ label: "₹ Value" }, { label: "Incremental" }],
      formula: "Incremental = CQ - LQ",
      table: [
        { slab: "Silver", range: "1.0L ≤ x < 1.5L", earning: "₹3,000" },
        { slab: "Gold", range: "1.5L ≤ x < 2.5L", earning: "₹4,500" },
        { slab: "Platinum", range: "x ≥ 2.5L", earning: "₹6,000" }
      ]
    }
  ],
  Consistency: [
    {
      title: "Overall YTD Achievement (Consistency)",
      icon: Trophy,
      badges: [{ label: "₹ Value" }, { label: "Qualified Quarters" }],
      formula: "Count of qualified quarters in YTD",
      table: [
        { slab: "Silver", range: "Any 2 Quarters (YTD)", earning: "₹6,000" },
        { slab: "Gold", range: "Any 3 Quarters (YTD)", earning: "₹18,000" },
        { slab: "Platinum", range: "All 4 Quarters (YTD)", earning: "₹36,000" }
      ]
    }
  ]
};

export const calculatorData = {
  Monthly: [
    { title: "Overall Achievement (Monthly)", icon: TrendingUp, params: "Current Month (CM), Target", tags: ["₹ Value"] },
    { title: "PPP Achievement (Monthly)", icon: TrendingUp, params: "Current Month (CM), Target", tags: ["₹ Value"] },
    { title: "PPP Volume Growth (Monthly)", icon: Percent, params: "Current Month (CM), Last Year Same Month (LY)", tags: ["Units"] },
    { title: "NI Achievement (Monthly)", icon: TrendingUp, params: "Current Month (CM), Target", tags: ["₹ Value"] },
    { title: "Second Flash (15th day)", icon: TrendingUp, params: "Current Fortnight, Monthly Target", tags: ["₹ Value"] },
  ],
  Quarterly: [
    { title: "Overall Achievement (Quarterly)", icon: TrendingUp, params: "Current Quarter (CQ), Target", tags: ["₹ Value"] },
    { title: "PPP Achievement (Quarterly)", icon: TrendingUp, params: "Current Quarter (CQ), Target", tags: ["₹ Value"] },
    { title: "PPP Volume Growth (Quarterly)", icon: Percent, params: "Current Quarter (CQ), Last Year Quarter (LYQ)", tags: ["Units"] },
    { title: "NI Achievement (Quarterly)", icon: TrendingUp, params: "Current Quarter (CQ), Target", tags: ["₹ Value"] },
    { title: "Incremental YPM (Quarterly)", icon: TrendingUp, params: "Current Quarter (CQ), Last Quarter (LQ)", tags: ["₹ Value"] },
  ],
  Consistency: [
    { title: "Overall YTD Achievement (Consistency)", icon: Trophy, params: "Qualified Quarters (YTD)", tags: ["₹ Value"] },
  ]
};
