import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-calculator',
  imports: [SharedModule],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss',
})
export class Calculator {
  ctcAmount = 600000;
  inputMode: 'percentage' | 'amount' = 'percentage';
  payMode: 'monthly' | 'yearly' = 'yearly';
  taxRegime: 'old' | 'new' = 'new';
  epfApplicable = true;
  ptApplicable = true;

  components = [
    { label: 'Basic', value: 40 },
    { label: 'HRA', value: 20 },
  ];

  earnings: { label: string; amount: number }[] = [];
  deductions: { label: string; amount: number }[] = [];

  totalDeductions = 0;
  netAnnualSalary = 0;
  netMonthlySalary = 0;

  calculateBreakdown() {
    const gross = this.ctcAmount;
    this.earnings = [];
    let totalEarnings = 0;

    for (const comp of this.components) {
      const amount =
        this.inputMode === 'percentage'
          ? (gross * comp.value) / 100
          : comp.value;
      this.earnings.push({ label: comp.label, amount });
      totalEarnings += amount;
    }

    this.deductions = [];
    this.totalDeductions = 0;

    if (this.epfApplicable) {
      const epf = Math.round(gross * 0.048);
      this.deductions.push({ label: 'EPF', amount: epf });
      this.totalDeductions += epf;
    }

    if (this.ptApplicable) {
      const pt = 2400;
      this.deductions.push({ label: 'Professional Tax', amount: pt });
      this.totalDeductions += pt;
    }

    const esi = Math.round(gross * 0.0175);
    this.deductions.push({ label: 'ESI', amount: esi });
    this.totalDeductions += esi;

    this.netAnnualSalary = gross - this.totalDeductions;
    this.netMonthlySalary = Math.round(this.netAnnualSalary / 12);
  }

  addComponent() {
    this.components.push({ label: '', value: 0 });
  }

  removeComponent(index: number) {
    this.components.splice(index, 1);
    this.calculateBreakdown();
  }

  ngOnInit(): void {}
}
