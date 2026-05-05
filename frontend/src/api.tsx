import axios from "axios";
import type { CompanyBalanceSheet, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch } from "./company";

interface SearchResponse {
    data: CompanySearch[];
}

export const searchCompanies = async (symbol: string) => {
    try {
        const response = await axios.get<SearchResponse>(`https://financialmodelingprep.com/stable/search-symbol?query=${symbol}&apikey=${import.meta.env.VITE_API_KEY}`);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.message);
            return error.message;
        }
        else {
            console.error("Unexpected error:", error);
            return "An unexpected error occurred.";
        } 
    }
}

export const getCompanyProfile = async (symbol: string) => {
    try {
        const response = await axios.get<CompanyProfile[]>(`https://financialmodelingprep.com/stable/profile?symbol=${symbol}&apikey=${import.meta.env.VITE_API_KEY}`);
        return response;
    } catch (error:any) {
        console.log("Axios error:", error.message);      
    }

}

export const getKeyMetrics = async (symbol: string) => {
    try {
        const response = await axios.get<CompanyKeyMetrics[]>(`https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${symbol}&apikey=${import.meta.env.VITE_API_KEY}`);
        return response;
    } catch (error:any) {
        console.log("Axios error:", error.message);
    }
}

export const getIncomeStatement = async (symbol: string) => {
    try {
        const response = await axios.get<CompanyIncomeStatement[]>(`https://financialmodelingprep.com/stable/income-statement?symbol=${symbol}&apikey=${import.meta.env.VITE_API_KEY}`);
        return response;
    } catch (error:any) {
        console.log("Axios error:", error.message);
    }
}

export const getBalanceSheet = async (symbol: string) => {
    try {
        const response = await axios.get<CompanyBalanceSheet[]>(`https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${symbol}&apikey=${import.meta.env.VITE_API_KEY}`);
        return response;
    } catch (error:any) {
        console.log("Axios error:", error.message);
    }
}
