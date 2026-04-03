import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('payments')
@UseGuards(JwtGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async createPayment(
    @CurrentUser() user: any,
    @Body()
    body: {
      subscriptionId?: string;
      amount: number;
      currency: string;
      paymentMethod: string;
    },
  ) {
    if (!body.amount || !body.currency || !body.paymentMethod) {
      throw new BadRequestException(
        'Missing required fields: amount, currency, paymentMethod',
      );
    }

    const payment = await this.paymentService.createPayment({
      userId: user.id,
      subscriptionId: body.subscriptionId,
      amount: body.amount,
      currency: body.currency,
      paymentMethod: body.paymentMethod,
    });

    return {
      success: true,
      data: payment,
      message: 'Payment created successfully',
    };
  }

  @Get('history')
  async getPaymentHistory(@CurrentUser() user: any) {
    const payments = await this.paymentService.getPaymentsByUser(user.id);

    return {
      success: true,
      data: payments,
      count: payments.length,
    };
  }

  @Get(':paymentId')
  async getPayment(
    @CurrentUser() user: any,
    @Param('paymentId') paymentId: string,
  ) {
    const payment = await this.paymentService.getPaymentById(paymentId);

    if (!payment || payment.userId !== user.id) {
      throw new BadRequestException('Payment not found or access denied');
    }

    return {
      success: true,
      data: payment,
    };
  }

  @Post('subscriptions/create')
  async createSubscription(
    @CurrentUser() user: any,
    @Body() body: { planId: string },
  ) {
    if (!body.planId) {
      throw new BadRequestException('Missing required field: planId');
    }

    const subscription = await this.paymentService.createSubscription(
      user.id,
      body.planId,
    );

    return {
      success: true,
      data: subscription,
      message: 'Subscription created successfully',
    };
  }

  @Get('subscriptions/:subscriptionId')
  async getSubscriptions(@CurrentUser() user: any) {
    const subscriptions = await this.paymentService.getSubscriptionsByUser(
      user.id,
    );

    return {
      success: true,
      data: subscriptions,
      count: subscriptions.length,
    };
  }

  @Post('subscriptions/:subscriptionId/cancel')
  async cancelSubscription(
    @CurrentUser() user: any,
    @Param('subscriptionId') subscriptionId: string,
  ) {
    const subscription = await this.paymentService.cancelSubscription(
      subscriptionId,
    );

    return {
      success: true,
      data: subscription,
      message: 'Subscription cancelled successfully',
    };
  }

  @Post('refund/:paymentId')
  async refundPayment(@Param('paymentId') paymentId: string) {
    const refund = await this.paymentService.processRefund(paymentId);

    return {
      success: true,
      data: refund,
      message: 'Refund processed successfully',
    };
  }
}
