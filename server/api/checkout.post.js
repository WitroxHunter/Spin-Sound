import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // inicjalizacja stripe z kluczem secret
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    // przygotowanie danych produktów do Stripe
    const lineItems = body.products.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // cena w centach
      },
      quantity: item.quantity,
    }));

    const baseUrl =
      process.env.BASE_URL ||
      process.env.NUXT_PUBLIC_BASE_URL ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cart`,
    });

    return { id: session.id };
  } catch (error) {
    console.error("Stripe checkout error:", error);
    throw createError({
      statusCode: 500,
      message: "Error creating checkout session",
    });
  }
});
