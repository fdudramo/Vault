"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Database,
  Copy,
  CheckCircle2,
  Shield,
  HardDrive,
  Lock,
  Settings2,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { ReactNode } from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Database className="size-4 text-blue-500" />
            </div>
            <span className="font-bold text-lg tracking-tight">Vault</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/app">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/app">
              <Button className="bg-blue-500 text-white hover:bg-blue-600 font-medium">
                Get your own vault, free.
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Secondary Hero Section */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-5xl px-6">
            {/* Grid of logos/icons with dashed lines */}
            <div>
              <div className="relative mx-auto max-w-sm">
                {/* Vertical dashed lines */}
                <div className="w-1/7 border-foreground/10 absolute -bottom-64 -top-16 left-0 border-l border-dashed"></div>
                <div className="w-1/7 left-1/7 border-foreground/10 -top-13 absolute -bottom-56 border-l border-dashed"></div>
                <div className="w-1/7 left-2/7 border-foreground/10 absolute -bottom-52 -top-9 border-l border-dashed"></div>
                <div className="w-1/7 left-3/7 border-foreground/10 absolute -bottom-48 -top-6 border-x border-dashed"></div>
                <div className="w-1/7 left-5/7 border-foreground/10 absolute -bottom-52 -top-9 border-x border-dashed"></div>
                <div className="w-1/7 left-6/7 border-foreground/10 -top-13 absolute -bottom-64 border-r border-dashed"></div>
              </div>

              {/* First row of icons */}
              <div className="lg:before:mask-x-from-85% before:border-foreground/10 relative mx-auto max-w-xl before:absolute before:inset-0 before:border-t before:border-dashed">
                <div className="*:bg-illustration *:ring-border shadow-black/6.5 mx-auto grid max-w-sm grid-cols-7 *:relative *:flex *:aspect-square *:items-center *:justify-center *:rounded-lg *:shadow-md *:ring-1">
                  <div className="col-start-4">
                    <svg
                      viewBox="0 0 256 116"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid"
                      className="size-5"
                    >
                      <path
                        fill="#FFF"
                        d="m202.357 49.394-5.311-2.124C172.085 103.434 72.786 69.289 66.81 85.997c-.996 11.286 54.227 2.146 93.706 4.059 12.039.583 18.076 9.671 12.964 24.484l10.069.031c11.615-36.209 48.683-17.73 50.232-29.68-2.545-7.857-42.601 0-31.425-35.497Z"
                      ></path>
                      <path
                        fill="#F4811F"
                        d="M176.332 108.348c1.593-5.31 1.062-10.622-1.593-13.809-2.656-3.187-6.374-5.31-11.154-5.842L71.17 87.634c-.531 0-1.062-.53-1.593-.53-.531-.532-.531-1.063 0-1.594.531-1.062 1.062-1.594 2.124-1.594l92.946-1.062c11.154-.53 22.839-9.56 27.087-20.182l5.312-13.809c0-.532.531-1.063 0-1.594C191.203 20.182 166.772 0 138.091 0 111.535 0 88.697 16.995 80.73 40.896c-5.311-3.718-11.684-5.843-19.12-5.31-12.747 1.061-22.838 11.683-24.432 24.43-.531 3.187 0 6.374.532 9.56C16.996 70.107 0 87.103 0 108.348c0 2.124 0 3.718.531 5.842 0 1.063 1.062 1.594 1.594 1.594h170.489c1.062 0 2.125-.53 2.125-1.594l1.593-5.842Z"
                      ></path>
                      <path
                        fill="#FAAD3F"
                        d="M205.544 48.863h-2.656c-.531 0-1.062.53-1.593 1.062l-3.718 12.747c-1.593 5.31-1.062 10.623 1.594 13.809 2.655 3.187 6.373 5.31 11.153 5.843l19.652 1.062c.53 0 1.062.53 1.593.53.53.532.53 1.063 0 1.594-.531 1.063-1.062 1.594-2.125 1.594l-20.182 1.062c-11.154.53-22.838 9.56-27.087 20.182l-1.063 4.78c-.531.532 0 1.594 1.063 1.594h70.108c1.062 0 1.593-.531 1.593-1.593 1.062-4.25 2.124-9.03 2.124-13.81 0-27.618-22.838-50.456-50.456-50.456"
                      ></path>
                    </svg>
                  </div>
                  <div className="col-start-6">
                    <svg className="size-5" viewBox="0 0 296 298" fill="none">
                      <mask
                        id="gemini__a"
                        width="296"
                        height="298"
                        x="0"
                        y="0"
                        maskUnits="userSpaceOnUse"
                        style={{ maskType: "alpha" }}
                      >
                        <path
                          fill="#3186FF"
                          d="M141.201 4.886c2.282-6.17 11.042-6.071 13.184.148l5.985 17.37a184.004 184.004 0 0 0 111.257 113.049l19.304 6.997c6.143 2.227 6.156 10.91.02 13.155l-19.35 7.082a184.001 184.001 0 0 0-109.495 109.385l-7.573 20.629c-2.241 6.105-10.869 6.121-13.133.025l-7.908-21.296a184 184 0 0 0-109.02-108.658l-19.698-7.239c-6.102-2.243-6.118-10.867-.025-13.132l20.083-7.467A183.998 183.998 0 0 0 133.291 26.28l7.91-21.394Z"
                        ></path>
                      </mask>
                      <g mask="url(#gemini__a)">
                        <g filter="url(#gemini__b)">
                          <ellipse
                            cx="163"
                            cy="149"
                            fill="#3689FF"
                            rx="196"
                            ry="159"
                          ></ellipse>
                        </g>
                        <g filter="url(#gemini__c)">
                          <ellipse
                            cx="33.5"
                            cy="142.5"
                            fill="#F6C013"
                            rx="68.5"
                            ry="72.5"
                          ></ellipse>
                        </g>
                        <g filter="url(#gemini__d)">
                          <ellipse
                            cx="19.5"
                            cy="148.5"
                            fill="#F6C013"
                            rx="68.5"
                            ry="72.5"
                          ></ellipse>
                        </g>
                        <g filter="url(#gemini__e)">
                          <path
                            fill="#FA4340"
                            d="M194 10.5C172 82.5 65.5 134.333 22.5 135L144-66l50 76.5Z"
                          ></path>
                        </g>
                        <g filter="url(#gemini__f)">
                          <path
                            fill="#FA4340"
                            d="M190.5-12.5C168.5 59.5 62 111.333 19 112L140.5-89l50 76.5Z"
                          ></path>
                        </g>
                        <g filter="url(#gemini__g)">
                          <path
                            fill="#14BB69"
                            d="M194.5 279.5C172.5 207.5 66 155.667 23 155l121.5 201 50-76.5Z"
                          ></path>
                        </g>
                        <g filter="url(#gemini__h)">
                          <path
                            fill="#14BB69"
                            d="M196.5 320.5C174.5 248.5 68 196.667 25 196l121.5 201 50-76.5Z"
                          ></path>
                        </g>
                      </g>
                      <defs>
                        <filter
                          id="gemini__b"
                          width="464"
                          height="390"
                          x="-69"
                          y="-46"
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          ></feFlood>
                          <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          ></feBlend>
                          <feGaussianBlur
                            result="effect1_foregroundBlur_69_17998"
                            stdDeviation="18"
                          ></feGaussianBlur>
                        </filter>
                        <filter
                          id="gemini__c"
                          width="265"
                          height="273"
                          x="-99"
                          y="6"
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          ></feFlood>
                          <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          ></feBlend>
                          <feGaussianBlur
                            result="effect1_foregroundBlur_69_17998"
                            stdDeviation="32"
                          ></feGaussianBlur>
                        </filter>
                        <filter
                          id="gemini__d"
                          width="265"
                          height="273"
                          x="-113"
                          y="12"
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          ></feFlood>
                          <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          ></feBlend>
                          <feGaussianBlur
                            result="effect1_foregroundBlur_69_17998"
                            stdDeviation="32"
                          ></feGaussianBlur>
                        </filter>
                        <filter
                          id="gemini__e"
                          width="299.5"
                          height="329"
                          x="-41.5"
                          y="-130"
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          ></feFlood>
                          <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          ></feBlend>
                          <feGaussianBlur
                            result="effect1_foregroundBlur_69_17998"
                            stdDeviation="32"
                          ></feGaussianBlur>
                        </filter>
                        <filter
                          id="gemini__f"
                          width="299.5"
                          height="329"
                          x="-45"
                          y="-153"
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          ></feFlood>
                          <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          ></feBlend>
                          <feGaussianBlur
                            result="effect1_foregroundBlur_69_17998"
                            stdDeviation="32"
                          ></feGaussianBlur>
                        </filter>
                        <filter
                          id="gemini__g"
                          width="299.5"
                          height="329"
                          x="-41"
                          y="91"
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          ></feFlood>
                          <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          ></feBlend>
                          <feGaussianBlur
                            result="effect1_foregroundBlur_69_17998"
                            stdDeviation="32"
                          ></feGaussianBlur>
                        </filter>
                        <filter
                          id="gemini__h"
                          width="299.5"
                          height="329"
                          x="-39"
                          y="132"
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          ></feFlood>
                          <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          ></feBlend>
                          <feGaussianBlur
                            result="effect1_foregroundBlur_69_17998"
                            stdDeviation="32"
                          ></feGaussianBlur>
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Second row of icons */}
              <div className="lg:before:mask-x-from-85% before:border-foreground/10 relative before:absolute before:inset-0 before:border-y before:border-dashed">
                <div className="mx-auto grid max-w-sm grid-cols-7 *:relative *:flex *:aspect-square *:items-center *:justify-center">
                  <div className="bg-foreground/3 -mr-px border">
                    <svg
                      viewBox="0 0 256 222"
                      width="1em"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                      className="size-5"
                    >
                      <path
                        fill="currentColor"
                        d="m128 0 128 221.705H0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="bg-foreground/3 col-start-3 -mr-px border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      width="1em"
                      height="1em"
                      className="*:fill-foreground size-5"
                    >
                      <defs>
                        <linearGradient
                          id="a"
                          x1="199.997"
                          x2="296.665"
                          y1="214.302"
                          y2="307.573"
                          gradientTransform="translate(-200 -213)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#62A0EA"></stop>
                          <stop offset="1" stopColor="#1A5FB4"></stop>
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#a)"
                        d="M48.26 2.274a6.113 6.113 0 0 0-1.838 8.468c10.109 15.655 12.495 27.463 11.46 37.811-4.184 19.816-13.279 23.836-21.227 23.836-7.76 0-5.682-12.771.151-16.509 3.482-2.174 7.942-3.587 11.365-3.587 3.392 0 6.142-2.741 6.142-6.123 0-3.383-2.75-6.124-6.142-6.124-3.998 0-7.92.84-11.581 2.27.748-3.529 1.024-7.343.057-11.397-1.468-6.156-5.694-12.036-13.032-17.736a6.15 6.15 0 0 0-8.621 1.065 6.114 6.114 0 0 0 1.078 8.595c5.978 4.643 7.952 8.08 8.627 10.909.675 2.829.132 5.864-1.224 10.034-1.733 5.62-3.745 10.637-4.627 15.448-.434 2.368-.471 4.945-.583 7.004-4.305-4.196-5.99-9.736-5.99-17.831-.001-3.382-2.751-6.124-6.142-6.123-3.389.003-6.135 2.743-6.136 6.123 0 11.056 3.233 21.576 11.898 28.594 7.844 7.473 27.791 4.711 27.791 16.708 0 3.386 4.956 5.034 8.347 5.034 3.478 0 7.855-2.325 7.855-5.034 0-13.612 14.345-21.885 37.96-21.849 3.392.005 6.144-2.734 6.149-6.116.006-3.383-2.738-6.13-6.13-6.136a78.226 78.226 0 0 0-4.741.145c2.64-6.209 3.811-13.045 3.569-20.429-.112-3.381-2.95-6.031-6.339-5.921-3.393.11-6.051 2.943-5.94 6.326.32 9.668-.042 18.301-7.245 22.852-2.048 1.293-4.429 2.415-6.687 2.415 1.753-4.768 3.077-9.801 3.619-15.226.346-3.462.383-7.575-.012-10.77-.613-4.95-1.353-10.564.526-14.793 1.688-3.642 5.47-5.167 11.023-5.167 3.389-.003 6.135-2.744 6.136-6.123.002-3.383-2.745-6.127-6.136-6.13-8.252 0-14.507 4.343-18.053 9.59-1.854-3.96-4.112-8.041-6.84-12.265a6.14 6.14 0 0 0-3.86-2.669 6.159 6.159 0 0 0-4.627.831z"
                      ></path>
                    </svg>
                  </div>
                  <div className="bg-illustration ring-border-illustration shadow-black/6.5 col-start-5 rounded-lg shadow-md ring-1">
                    <svg className="size-5" fill="none" viewBox="0 0 100 100">
                      <path
                        fill="#5E6AD2"
                        d="M1.225 61.523c-.222-.949.908-1.546 1.597-.857l36.512 36.512c.69.69.092 1.82-.857 1.597-18.425-4.323-32.93-18.827-37.252-37.252ZM.002 46.889a.99.99 0 0 0 .29.76L52.35 99.71c.201.2.478.307.76.29 2.37-.149 4.695-.46 6.963-.927.765-.157 1.03-1.096.478-1.648L2.576 39.448c-.552-.551-1.491-.286-1.648.479a50.067 50.067 0 0 0-.926 6.962ZM4.21 29.705a.988.988 0 0 0 .208 1.1l64.776 64.776c.289.29.726.375 1.1.208a49.908 49.908 0 0 0 5.185-2.684.981.981 0 0 0 .183-1.54L8.436 24.336a.981.981 0 0 0-1.541.183 49.896 49.896 0 0 0-2.684 5.185Zm8.448-11.631a.986.986 0 0 1-.045-1.354C21.78 6.46 35.111 0 49.952 0 77.592 0 100 22.407 100 50.048c0 14.84-6.46 28.172-16.72 37.338a.986.986 0 0 1-1.354-.045L12.659 18.074Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="bg-foreground/3 col-start-7 -mb-px -ml-px border">
                    <svg
                      className="size-5"
                      viewBox="7.002 8.287 148.203 175.426"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m7.002 8.287 39.319 21.172v39.32h57.467l36.295 21.172h-133.081zm148.203 75.615v-54.443l-42.344-21.172v51.418zm0 99.811-39.319-21.172v-39.32h-57.467l-36.295-21.172h133.081zm-148.203-75.615v54.443l42.343 21.172v-51.418z"
                        fill="#6747c7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Third row of icons */}
              <div className="lg:before:mask-x-from-85% before:border-foreground/10 relative mx-auto max-w-2xl before:absolute before:inset-0 before:border-b before:border-dashed">
                <div className="mx-auto grid max-w-sm grid-cols-7 *:relative *:flex *:aspect-square *:items-center *:justify-center">
                  <div className="bg-foreground/3 col-start-2 -mr-px -mt-px border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid"
                      viewBox="0 0 256 260"
                      className="size-5"
                    >
                      <path
                        fill="currentColor"
                        d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="bg-illustration ring-border-illustration shadow-black/6.5 col-start-5 rounded-lg shadow-md ring-1">
                    <svg
                      width="109"
                      height="113"
                      viewBox="0 0 109 113"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                    >
                      <path
                        d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
                        fill="url(#paint0_linear)"
                      />
                      <path
                        d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
                        fill="#3ECF8E"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="53.9738"
                          y1="54.974"
                          x2="94.1635"
                          y2="71.8295"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#249361" />
                          <stop offset="1" stopColor="#3ECF8E" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero text and button */}
            <div className="mx-auto mt-20 max-w-2xl text-center">
              <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight">
                One vault. for all your
                <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  dev accounts
                </span>
              </h1>
              <p className="text-muted-foreground mx-auto mb-6 mt-4 max-w-xl tracking-tight">
                the one you've been actually looking for
              </p>
              <Link href="/app">
                <Button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-md border-[0.5px] border-white/10 shadow-black/15 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                  get your own vault, free.
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Long Story Section */}
        <section className="py-24 border-t border-white/5 bg-black/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <div className="space-y-4 text-left">
                <p className="text-xl md:text-2xl font-medium text-foreground/90">
                  Yesterday I lost 7 minutes trying to find the right API token.
                </p>

                <ul className="list-none space-y-1 text-muted-foreground">
                  <li>• Wrong account.</li>
                  <li>• Wrong project.</li>
                  <li>• Wrong tab.</li>
                </ul>

                <p className="text-muted-foreground">
                  Like most devs, I have multiple accounts for everything:
                  different apps, different tokens, different environments.
                </p>

                <p className="text-muted-foreground">
                  Each account has its own API keys, chats, URLs, and configs.
                  And I constantly forget which account owns what.
                </p>

                <p className="text-muted-foreground">
                  So I built a small vault.
                </p>

                <p className="text-muted-foreground">
                  Now every app has its own vault where I store: accounts, API
                  keys, tokens, and context.
                </p>

                <p className="text-muted-foreground">
                  When I need something, I open the vault, copy it, and move on.
                  No digging through settings. No guessing which account it was.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What you get Section */}
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
          <div className="@container mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Built to cover your needs
              </h2>
              <p className="tracking-tight mt-4 text-muted-foreground">
                Everything you need to manage your dev accounts
              </p>
            </div>
            <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
              <Card className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <CardDecorator>
                    <Zap className="size-6" aria-hidden />
                  </CardDecorator>

                  <h3 className="mt-6 font-medium text-lg">
                    one vault per app
                  </h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    keep each app's accounts, tokens, api keys, and context all
                    in one place.
                  </p>
                </CardContent>
              </Card>

              <Card className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <CardDecorator>
                    <Settings2 className="size-6" aria-hidden />
                  </CardDecorator>

                  <h3 className="mt-6 font-medium text-lg">
                    You have full control
                  </h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    nothing is linked to your account. bring your own supabase
                    db or use local storage.
                  </p>
                </CardContent>
              </Card>

              <Card className="group shadow-zinc-950/5">
                <CardHeader className="pb-3">
                  <CardDecorator>
                    <Sparkles className="size-6" aria-hidden />
                  </CardDecorator>

                  <h3 className="mt-6 font-medium text-lg">its free</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    local storage is free. supabase sync is $1/month. thats it.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mx-auto max-w-2xl space-y-6 text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                the vault you've been looking for
              </h2>
            </div>

            <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
              <div className="rounded-(--radius) flex flex-col justify-between space-y-8 border border-white/10 bg-white/[0.02] p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10">
                <div className="space-y-4">
                  <div>
                    <h2 className="font-medium">Free Plan</h2>
                    <span className="my-3 block text-2xl font-semibold">
                      $0 / forever
                    </span>
                    <p className="text-muted-foreground text-sm">
                      Perfect for simple local storage.
                    </p>
                  </div>

                  <Link href="/app">
                    <Button
                      variant="outline"
                      className="w-full border-white/10 hover:border-white/20"
                    >
                      Get Started
                    </Button>
                  </Link>

                  <hr className="border-dashed border-white/10" />

                  <ul className="list-outside space-y-3 text-sm">
                    {[
                      "Local storage only",
                      "Secure: no one can access your passwords but you",
                      "Nothing linked to your account",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-blue-400" />
                        {item}
                      </li>
                    ))}
                    <li className="text-muted-foreground text-sm italic">
                      Note: If you clear your browser storage, cache, or update,
                      your data will be gone!
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-(--radius) border border-white/10 bg-white/[0.02] p-6 shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        RECOMMENDED
                      </div>
                      <h2 className="font-medium text-blue-400">Pro Plan</h2>
                      <span className="my-3 block text-2xl font-semibold">
                        $1 / mo
                      </span>
                      <p className="text-muted-foreground text-sm">
                        billed annually
                      </p>
                    </div>

                    <Button
                      className="w-full bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() =>
                        window.open("https://t.me/OmarGatara", "_blank")
                      }
                    >
                      Talk to me
                    </Button>
                  </div>

                  <div>
                    <div className="text-sm font-medium">
                      Everything in free plus:
                    </div>

                    <ul className="mt-4 list-outside space-y-3 text-sm">
                      {[
                        "Bring your own database (Supabase)",
                        "Maximum security",
                        "DB credentials saved in your Chrome storage (none linked to your account)",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-blue-400" />
                          {item}
                        </li>
                      ))}
                      <li className="text-muted-foreground text-sm italic">
                        Note: If you clear browser storage, you just need to
                        re-authenticate your Supabase. Your data is safe!
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
