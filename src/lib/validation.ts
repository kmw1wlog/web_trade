import { z } from "zod";
import { products } from "@/content/products";

const email = z
  .string({ required_error: "이메일을 입력해 주세요." })
  .email("이메일 형식이 올바르지 않습니다.");

const optionalEmail = z
  .string()
  .email("이메일 형식이 올바르지 않습니다.")
  .optional()
  .or(z.literal(""));

const metadata = z.record(z.unknown()).optional();
const utm = z
  .object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
    content: z.string().optional()
  })
  .partial()
  .optional();

export const leadSchema = z.object({
  email: optionalEmail,
  instagramUsername: z.string().optional(),
  source: z.string().optional(),
  channel: z.string().optional(),
  persona: z.string().optional(),
  keyword: z.string().optional(),
  interest: z.string().optional(),
  utm,
  metadata
});

export const waitlistSchema = z.object({
  email,
  type: z.enum(["app", "course", "mock", "api", "crypto", "premium"]),
  selectedOptions: z.array(z.string()).optional(),
  persona: z.string().optional(),
  source: z.string().optional(),
  utm: z.record(z.unknown()).optional(),
  metadata
});

export const mockTradeSchema = z.object({
  email: optionalEmail,
  symbol: z.string().min(1, "필수 항목을 입력해 주세요."),
  tradeDate: z.string().optional(),
  direction: z.enum(["long", "short", "watch"]).optional(),
  conditionName: z.string().optional(),
  entryReason: z.string().min(1, "필수 항목을 입력해 주세요."),
  stopRule: z.string().optional(),
  targetRule: z.string().optional(),
  result: z.string().optional(),
  review: z.string().optional(),
  emotion: z.string().optional(),
  persona: z.string().optional(),
  source: z.string().optional()
});

export const partnerInquirySchema = z.object({
  name: z.string().optional(),
  email,
  company: z.string().optional(),
  category: z.string().optional(),
  message: z.string().min(10, "문의 내용은 최소 10자 이상 입력해 주세요.")
});

export const eventSchema = z.object({
  eventName: z.string().min(1),
  anonymousId: z.string().optional(),
  email: optionalEmail,
  path: z.string().optional(),
  source: z.string().optional(),
  persona: z.string().optional(),
  properties: z.record(z.unknown()).optional()
});

export const manychatSchema = z.object({
  keyword: z.string().optional(),
  channel: z.string().optional(),
  instagramUsername: z.string().optional(),
  firstName: z.string().optional(),
  source: z.string().optional(),
  postId: z.string().optional(),
  ref: z.string().optional()
});

export const checkoutSchema = z.object({
  productSlug: z.string().refine((slug) => products.some((product) => product.slug === slug), "알 수 없는 상품입니다."),
  email: optionalEmail,
  source: z.string().optional(),
  persona: z.string().optional(),
  utm: z.record(z.unknown()).optional()
});

export function formatZodError(error: z.ZodError) {
  return error.issues[0]?.message || "입력값을 다시 확인해 주세요.";
}
