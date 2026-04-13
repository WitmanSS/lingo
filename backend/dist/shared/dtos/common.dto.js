"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDTO = exports.AddVocabularyDTO = exports.UpdateStoryDTO = exports.CreateStoryDTO = exports.UpdateUserDTO = exports.CreateUserDTO = void 0;
const class_validator_1 = require("class-validator");
class CreateUserDTO {
    username;
    email;
    password;
    firstName;
    lastName;
}
exports.CreateUserDTO = CreateUserDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "lastName", void 0);
class UpdateUserDTO {
    username;
    bio;
    avatarUrl;
}
exports.UpdateUserDTO = UpdateUserDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "bio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "avatarUrl", void 0);
class CreateStoryDTO {
    title;
    level;
    content;
    coverImage;
}
exports.CreateStoryDTO = CreateStoryDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoryDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoryDTO.prototype, "level", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoryDTO.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoryDTO.prototype, "coverImage", void 0);
class UpdateStoryDTO {
    title;
    content;
    coverImage;
}
exports.UpdateStoryDTO = UpdateStoryDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStoryDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStoryDTO.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStoryDTO.prototype, "coverImage", void 0);
class AddVocabularyDTO {
    word;
    definition;
    level;
    exampleSentence;
    audioUrl;
}
exports.AddVocabularyDTO = AddVocabularyDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVocabularyDTO.prototype, "word", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVocabularyDTO.prototype, "definition", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVocabularyDTO.prototype, "level", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVocabularyDTO.prototype, "exampleSentence", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddVocabularyDTO.prototype, "audioUrl", void 0);
class PaginationDTO {
    page;
    limit;
    sortBy;
    sortOrder;
}
exports.PaginationDTO = PaginationDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaginationDTO.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaginationDTO.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationDTO.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationDTO.prototype, "sortOrder", void 0);
//# sourceMappingURL=common.dto.js.map