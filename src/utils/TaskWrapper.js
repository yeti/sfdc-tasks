export default class TaskWrapper {
  constructor(data) {
    this._cache = { data };
  }

  get data() {
    return this._cache.data;
  }

  get id() {
    return this.data.Id;
  }

  get name() {
    return this.data.Subject;
  }

  get dueDate() {
    if (!this._cache.dueDate) {
      this._cache.dueDate = new DateWrapper(this.data.ActivityDate);
    }
    return this._cache.dueDate;
  }

  get related() {
    return this.data.What || this.data.Who;
  }

  get relatedRecord() {
    if (!this._cache.relatedRecord) {
      this._cache.relatedRecord = this.related ? new RelatedRecordWrapper(this.related) : null;
    }
    return this._cache.relatedRecord;
  }

  get owner() {
    if (!this._cache.owner) {
      this._cache.owner = new OwnerWrapper(this.data.Owner);
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
    return this._cache.data;
  }

  get firstName() {
    return this.data.FirstName;
  }

  get name() {
    return this.data.Name;
  }

  get picture() {
    return this.data.SmallPhotoUrl;
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
    return this.data.Id;
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
      this._cache.date = new Date(this.data);
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
