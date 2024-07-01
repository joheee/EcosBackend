import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseUserDetailPipe implements PipeTransform {
  transform(value: any) {
    // if (typeof value !== 'object' || value === null) {
    //   throw new BadRequestException(
    //     `Validation failed (object expected) but got : ${value}`,
    //   );
    // }

    const result = { ...value };

    // Convert fields to their appropriate types
    if (result.is_email_verified !== undefined) {
      result.is_email_verified = this.toBoolean(result.is_email_verified);
    }
    if (result.is_phone_verified !== undefined) {
      result.is_phone_verified = this.toBoolean(result.is_phone_verified);
    }
    if (result.grade !== undefined) {
      result.grade = this.toNumber(result.grade);
    }

    return result;
  }

  toBoolean(value: any): boolean {
    return value === 'true' || value === true;
  }

  toNumber(value: any): number {
    const val = parseFloat(value);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed (number expected) for value: ${value}`,
      );
    }
    return val;
  }
}
