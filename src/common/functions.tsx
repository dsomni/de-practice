import { ApproximateFunction } from "../classes/ApproximateFunction";
import { SmoothFunction } from "../classes/SmoothFunction";

export const f = (x: number, y: number) => {
    if (Math.abs(parseFloat(x.toFixed(5))) === 0) return 0;
    return y / x - y - x;
};

export const Euler = new ApproximateFunction(
    (x: number, y: number, h: number) => {
        return y + h * f(x, y);
    },
    "Euler",
    "blue");


export const ImprovedEuler = new ApproximateFunction(
    (x: number, y: number, h: number) => {
        const k1 = h * f(x, y);
        const k2 = h * f(x + h, y + k1);
        return y + (k1 + k2) / 2;
    },
    "ImprovedEuler",
    "green");


export const Runge_Kutta = new ApproximateFunction(
    (x: number, y: number, h: number) => {
        const k1 = h * f(x, y);
        const k2 = h * f(x + h / 2, y + k1 / 2);
        const k3 = h * f(x + h / 2, y + k2 / 2);
        const k4 = h * f(x + h, y + k3);
        return y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    },
    "Runge_Kutta",
    "black");

export const actualFunction = new SmoothFunction(
    (x: number, x0: number, y0: number) => {
        var c = Math.pow(Math.E, x0) * (y0 + x0) / x0;
        return c * Math.pow(Math.E, x * (-1)) * x - x;
    },
    "y = c*e^(-x)*x -x",
    "red");