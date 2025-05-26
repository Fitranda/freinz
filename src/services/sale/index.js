export async function fetchSales() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sale`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error Response:", errorText);
      throw new Error(
        `Failed to fetch sales: ${res.status} ${errorText || res.statusText}`
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Fetch sales error:", error);
    return [];
  }
}

export async function fetchSaleDetail(saleId) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sale/${saleId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error Response:", errorText);
      throw new Error(
        `Failed to fetch sales detail: ${res.status} ${
          errorText || res.statusText
        }`
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Fetch sales detail error:", error);
    return null;
  }
}

export async function createSale(saleData) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sale`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleData),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error Response:", errorText);
      throw new Error(
        `Failed to create sale: ${res.status} ${errorText || res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Create sale error:", error);
    return null;
  }
}
