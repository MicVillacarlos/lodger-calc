import React, { useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { moneyFormat } from "../helpers/money";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

interface FormData {
  type_of_bill: "electricity" | "water" | "";
  lodger_id: string;
  past_reading_date: string;
  present_reading_date: string;
  past_reading: number | "";
  present_reading: number | "";
  current_bill: number | "";
  monthly_given_bill: number | "";
  due_date: string;
  add_on: number | "";
}

export default function Calculator() {
  const [formData, setFormData] = useState<FormData>({
    type_of_bill: "",
    lodger_id: "",
    past_reading_date: "",
    present_reading_date: "",
    past_reading: "",
    present_reading: "",
    current_bill: "",
    monthly_given_bill: "",
    due_date: "",
    add_on: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        e.target.type === "number"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const calculateBill = useMemo(() => {
    const {
      present_reading,
      past_reading,
      current_bill,
      monthly_given_bill,
      add_on,
    } = formData;

    if (
      present_reading !== "" &&
      past_reading !== "" &&
      current_bill !== "" &&
      monthly_given_bill !== "" &&
      add_on !== ""
    ) {
      const differenceReading = Number(present_reading) - Number(past_reading);
      const billQuotient = Number(current_bill) / Number(monthly_given_bill);
      const totalAddOn = billQuotient + Number(add_on);
      const billAmount = Math.round(differenceReading * totalAddOn * 100) / 100;
      return moneyFormat(billAmount);
    }
    return "";
  }, [formData]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Lodger Bill Calculator</CardTitle>
          <CardDescription>
            Compute electricity or water charges with add-ons.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2 ">
                <Label htmlFor="past_reading">Past Reading</Label>
                <Input
                  id="past_reading"
                  type="number"
                  value={formData.past_reading}
                  onChange={handleChange}
                  className="rounded-lg border-2 border-gray-300"
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current_bill">Current Bill (₱)</Label>
                <Input
                  id="current_bill"
                  type="number"
                  value={formData.current_bill}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="add_on">Add On (₱)</Label>
                <Input
                  id="add_on"
                  type="number"
                  value={formData.add_on}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="present_reading">Present Reading</Label>
                <Input
                  id="present_reading"
                  type="number"
                  value={formData.present_reading}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly_given_bill">Monthly Given Bill</Label>
                <Input
                  id="monthly_given_bill"
                  type="number"
                  value={formData.monthly_given_bill}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="rounded-md border p-3">
              <div>Difference</div>
              <div className="text-foreground font-medium">
                {formData.present_reading !== "" && formData.past_reading !== ""
                  ? Number(formData.present_reading) -
                    Number(formData.past_reading)
                  : "—"}
              </div>
            </div>
            <div className="rounded-md border p-3">
              <div>Quotient</div>
              <div className="text-foreground font-medium">
                {formData.current_bill !== "" &&
                formData.monthly_given_bill !== ""
                  ? (
                      Number(formData.current_bill) /
                      Number(formData.monthly_given_bill)
                    ).toFixed(4)
                  : "—"}
              </div>
            </div>
            <div className="rounded-md border p-3">
              <div>New Monthly Given (for Water)</div>
              <div className="text-foreground font-medium">
                {formData.current_bill !== "" &&
                formData.monthly_given_bill !== "" &&
                formData.add_on !== ""
                  ? Number(formData.current_bill) /
                      Number(formData.monthly_given_bill) +
                    formData.add_on
                  : "—"}
              </div>
            </div>
            <div className="rounded-md border p-3">
              <div>Total Add-On</div>
              <div className="text-foreground font-medium">
                {formData.current_bill !== "" &&
                formData.monthly_given_bill !== "" &&
                formData.add_on !== ""
                  ? (
                      Number(formData.current_bill) /
                        Number(formData.monthly_given_bill) +
                      Number(formData.add_on)
                    ).toFixed(4)
                  : "—"}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {calculateBill && (
            <div className="rounded-lg border p-4 bg-card w-full flex items-center justify-between ">
              <div className="text-sm text-muted-foreground">Bill Amount</div>
              <div className="text-2xl font-semibold tracking-tight">
                {calculateBill}
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
