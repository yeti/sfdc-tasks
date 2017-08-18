import _ from 'lodash'

export default class TaskWrapper {
  constructor(data) {
    this._cache = { data };
  }

  get data() {
    return _.get(this._cache, 'data', {});
  }

  get id() {
    return _.get(this.data, 'Id', '');
  }

  get name() {
    return _.get(this.data, 'Subject', '');
  }

  get dueDate() {
    if (!this._cache.dueDate) {
      this._cache.dueDate = new DateWrapper(_.get(this.data, 'ActivityDate', null));
    }
    return this._cache.dueDate;
  }

  get related() {
    return _.get(this.data, 'What') || _.get(this.data, 'Who');
  }

  get relatedRecord() {
    if (!this._cache.relatedRecord) {
      this._cache.relatedRecord = this.related ? new RelatedRecordWrapper(this.related) : null;
    }
    return this._cache.relatedRecord;
  }

  get owner() {
    if (!this._cache.owner) {
      this._cache.owner = new OwnerWrapper(_.get(this.data, 'Owner'));
    }
    return this._cache.owner;
  }
}

export class RelatedRecordWrapper {
  constructor(data) {
    this._cache = { data };
  }

  get data() {
    return this._cache.data;
  }

  get name() {
    return this.data.Name;
  }

  get id() {
    return this.data.Id;
  }

  get type() {
    return this.data.Type;
  }

  get iconType() {
    return this.type.toLowerCase();
  }

  get isOpportunity() {
    return this.type === 'Opportunity';
  }

  get isContact() {
    return this.type === 'Contact';
  }

  get isAccount() {
    return this.type === 'Account';
  }

  get isLead() {
    return this.type === 'Lead';
  }
}

export class OwnerWrapper {
  constructor(data) {
    this._cache = { data };
  }

  get data() {
    return _.get(this._cache, 'data', '');
  }

  get firstName() {
    return _.get(this.data, 'FirstName', '');
  }

  get name() {
    return _.get(this.data, 'Name', '');
  }

  get picture() {
    return _.get(this.data, 'SmallPhotoUrl', '');
  }

  get pictureMissing() {
    return !this.picture || this.data.SmallPhotoUrl.includes('/profilephoto/005');
  }

  get initials() {
    return this.name.split(' ')
      .map(word => word.length && word[0].toUpperCase())
      .join('');
  }

  get id() {
    return _.get(this.data, 'Id', '');
  }
}

export class DateWrapper {
  constructor(data) {
    this._cache = { data };
  }

  get data() {
    return this._cache.data;
  }

  get isMissing() {
    return !this.data;
  }

  get date() {
    if (!this._cache.date) {
      // This is a shit hack to make sure missing dates get sorted last :(
      this._cache.date = this.isMissing ? new Date('2999-01-01') : new Date(this.data);
    }
    return this._cache.date;
  }

  get month() {
    return this.date.getMonth() + 1;
  }

  get day() {
    return this.date.getDate();
  }

  get year() {
    return this.date.getFullYear()
      .toString()
      .split('')
      .splice(2)
      .join(''); // There's gotta be a better way to fuckin do this
  }

  get formattedDate() {
    return this.isMissing ? '' : `${this.month}/${this.day}/${this.year}`;
  }

  get isPast() {
    return new Date > this.date;
  }
}
