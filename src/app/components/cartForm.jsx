"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RiLoader3Fill } from "react-icons/ri"
import { postData } from "@/api/fetch-data"
import { useCartStore } from "@/stores/cart-store"
import { useSiteSettings } from "@/stores/site-setting"



// Initialize translations
const formSchema = (t) => z.object({
  user_name: z.string().min(2, {
    message: t('validation.name'),
  }),
  user_email: z.string().email({
    message: t('validation.email'),
  }),
  user_phone: z.string().min(1, {
    message: t('validation.phone'),
  }),
  user_address: z.string().min(10, {
    message: t('validation.address'),
  }).max(500, {
    message: "Address must be less than 500 characters.",
  })
})



const CartForm = () => {

  const t = useTranslations('cartForm')
  const d = useTranslations('cartPlaceholders')
  const { items, clearCart } = useCartStore()
  const { siteSettings } = useSiteSettings();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      user_name: "",
      user_email: "",
      user_phone: "",
      user_address: "",
    },
  })

  const inputs = [
    {
      name: "user_name",
      type: "text",
      placeholder: d('name'),
    },
    {
      name: "user_email",
      type: "email",
      placeholder: d('email'),
    },
    {
      name: "user_phone",
      type: "tel",
      placeholder: d('phone'),
    },
  ]
  const { formState: { isSubmitting } } = form

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      // // ✅ Validate Phone (no zod)
      // let phone = values.user_phone.replace(/\D/g, "");

      // // must start with 01 and be 11 digits
      // const egyptPhoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;

      // if (!egyptPhoneRegex.test(phone)) {
      //   toast.error("الرجاء إدخال رقم مصري صحيح يبدأ بـ 01 ويتكون من 11 رقم");
      //   return;
      // }

      // // ✅ Normalize to WhatsApp Format 2010xxxxxxx
      // phone = "2" + phone; // convert 01xxxxxxxxx -> 201xxxxxxxxx

      // // ✅ Put formatted phone back
      // values.user_phone = phone;

      const data = {
        ...values,
        items: items?.map((item) => ({
          product_id: item.id,
          price: item.price,
          quantity: item.quantity,
          product_name: item.title
        }))
      };

      const response = await postData({ url: '/store-order', data })
      console.log('Response:', response)

      if (response?.code === 200) {
        toast.success(t('success'));
        form.reset();
        clearCart();


          
      

        const orderDetails = response?.data?.data?.items?.map(item =>
          `- ${item.product_name} (x${item.quantity}) - ${Number(item.price).toFixed(2)} EGP`
        ).join("\n");

        const message = `*New Order*\n\n` +
          `*Order ID:* #${response?.data?.data?.id}\n` +
          `*Customer Name:* ${response?.data?.data?.user_name}\n` +
          `*Email:* ${response?.data?.data?.user_email}\n` +
          `*Phone:* ${response?.data?.data?.user_phone}\n` +
          `*Address:* ${response?.data?.data?.user_address}\n\n` +
          `*Order Items:*\n${orderDetails}\n\n` +
          `*Total Price:* ${Number(response?.data?.data?.total_price).toFixed(2)} EGP`;
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        
        let whatsappNumber = siteSettings?.phone_order?.replace(/\D/g, '') || '';

        if (whatsappNumber.startsWith("01")) {
          whatsappNumber = "2" + whatsappNumber;
        }

        if (!whatsappNumber.startsWith("20")) {
          whatsappNumber = "20" + whatsappNumber;
        }

        setTimeout(() => {
          if (whatsappNumber) {
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
          }
        }, 2000);



      } else {
        toast.error(t('error'));
      }

    } catch (error) {
      console.error('Error processing order:', error);
      toast.error(t('error'));
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 col-span-12 md:col-span-6 bg-light-black  rounded-3xl border border-main xl:p-12 p-6">
        <div className="space-y-4">

          <h3 className="xl:text-4xl text-2xl font-bold text-main">{t('title')}</h3>
          <p className="text-gray-400">{t('description')}</p>
        </div>
        {/* name */}
        {inputs?.map((input, idx) => (
          <FormField
            key={idx}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={input.placeholder} type={input.type} className="placeholder:text-gray-400 text-white h-12 border-1 border-gray-400 focus-visible:ring-main focus-visible:outline-0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {/* address */}
        <FormField
          control={form.control}
          name="user_address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={d('address')}
                  className="resize-none h-24 border-1 border-gray-400 focus-visible:ring-main focus-visible:outline-0 placeholder:text-gray-400 text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting || items?.length === 0} type="submit" className="px-16 h-12 bg-main hover:bg-main/90 w-1/2 font-semibold">
          {isSubmitting ? <RiLoader3Fill className="animate-spin" /> : d('submitButton')}
        </Button>
      </form>
    </Form>
  )
}

export default CartForm