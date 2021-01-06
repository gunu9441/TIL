# import torch

class Calculator:

    def __init__(self, num):
        self.num = num;

    def __init__(self, num1, num2):
        self.result = 0
        self.num1 = num1
        self.num2 = num2

    def add(self):
        self.result += self.num1 + self.num2 + self.num
        return self.result

cal3 = Calculator(1)
cal1 = Calculator(2, 5, 8)
cal2 = Calculator(2, 7, 7)
print(cal1.add())
print(cal1.add())
print(cal1.add())
print(cal1.add())

