export type PortfolioGet = {
    id: number;
    symbol: string;
    companyName: string;
    purchasePrice: number;
    lastDividend: number;
    industry: string;
    marketCap: number;
    comments: any
}


export type PortfolioPost = {
    symbol: string;
}