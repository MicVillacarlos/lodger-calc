import React, { useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { moneyFormat } from "../helpers/money";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

const Salary = () => {
  const [salary, setSalary] = useState<number | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSalary(value === "" ? "" : Number(value));
  };

  const breakdowns = useMemo(() => {
    if (salary === "" || salary <= 0) return null;
    const saving = salary * 0.55;
    const duties = salary * 0.2;
    const spend = salary * 0.25;
    const fun = spend * 0.6;
    return { saving, duties, spend, fun };
  }, [salary]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Salary Breakdown</CardTitle>
          <CardDescription>
            Enter your salary to see the automatic breakdown.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Monthly Salary (₱)</Label>
              <Input
                id="salary"
                type="number"
                value={salary}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
          </div>
          {breakdowns && (
            <>
              <Separator className="my-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="rounded-md border p-3">
                  <div>Savings (50%)</div>
                  <div className="text-foreground font-medium">
                    {moneyFormat(breakdowns.saving)}
                  </div>
                </div>
                <div className="rounded-md border p-3">
                  <div>Duties (20%)</div>
                  <div className="text-foreground font-medium">
                    {moneyFormat(breakdowns.duties)}
                  </div>
                </div>
                <div className="rounded-md border p-3">
                  <div>Spend (30%)</div>
                  <div className="text-foreground font-medium">
                    {moneyFormat(breakdowns.spend)}
                  </div>
                </div>
                <div className="rounded-md border p-3">
                  <div>Fun (60% of Spend)</div>
                  <div className="text-foreground font-medium">
                    {moneyFormat(breakdowns.fun)}
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Salary;