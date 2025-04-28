import { Logger, MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { OpenTelemetryModule } from "@metinseylan/nestjs-opentelemetry";

import { AppLoggerMiddleware } from "./common/middleware/request-logger.middleware";
import { validate } from "./common/validators/env.validator";
import ormConfig from "./db/db.config";
import { AccountsModule } from "./modules/accounts/accounts.module";
import { AuthModule } from "./modules/auth/auth.module";
import { EmailsModule } from "./modules/emails/emails.module";
import { FileUploadsModule } from "./modules/file-uploads/file-uploads.module";
import { HealthModule } from "./modules/health/health.module";
import { RolesModule } from "./modules/roles/roles.module";
import { UserProfilesModule } from "./modules/user-profiles/user-profiles.module";
import { UsersModule } from "./modules/users/users.module";
import { VerificationRequestsModule } from "./modules/verification-requests/verification-requests.module";
import { WebsocketExampleModule } from "./modules/websocket-example/websocket-example.module";

@Module({
  imports: [
    MikroOrmModule.forRoot(ormConfig),

    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      validate,
    }),

    OpenTelemetryModule.forRoot({
      serviceName: "Project Backend",
    }),

    EmailsModule,

    UsersModule,
    AuthModule,
    RolesModule,
    FileUploadsModule,
    WebsocketExampleModule,
    UserProfilesModule,
    HealthModule,
    VerificationRequestsModule,
    AccountsModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
